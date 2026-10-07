"use server";

import { de } from "@/content/de";

type Field = "name" | "email" | "message" | "consent" | "send";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  interests: string[];
  message: string;
  consent: boolean;
};

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Increments per submit so the form remounts with the values below after React resets it. */
  attempt: number;
  errors?: Partial<Record<Field, string>>;
  values?: ContactValues;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM = "Strive Website <kontakt@strivedigitally.com>";

/**
 * Sends the enquiry to CONTACT_TO through Resend, with Reply-To set to the visitor.
 * Both values are Worker secrets (`wrangler secret put`); without them the enquiry is only logged.
 */
async function deliver(values: ContactValues): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.info("[contact] e-mail not configured, enquiry:", values);
    return true;
  }

  const details = [
    `Name: ${values.name}`,
    `E-Mail: ${values.email}`,
    values.company && `Unternehmen: ${values.company}`,
    values.interests.length > 0 && `Interessen: ${values.interests.join(", ")}`,
  ].filter(Boolean);
  const text = `${details.join("\n")}\n\n${values.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    // Resend rejects requests without a User-Agent, and Workers' fetch sends none by default.
    headers: { Authorization: `Bearer ${key.trim()}`, "Content-Type": "application/json", "User-Agent": "strive-website/1.0" },
    body: JSON.stringify({ from: FROM, to: [to.trim()], reply_to: values.email, subject: `Neue Anfrage von ${values.name}`, text }),
  });
  if (!res.ok) {
    // Shape of the secrets only (never their values), to spot a mangled paste.
    const shape = { keyLength: key.trim().length, keyPrefixOk: key.trim().startsWith("re_"), toLooksLikeEmail: EMAIL.test(to.trim()) };
    console.error("[contact] Resend error", res.status, await res.text(), shape);
  }
  return res.ok;
}

export async function sendContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const attempt = prev.attempt + 1;

  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) return { status: "success", attempt };

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const values: ContactValues = {
    name: text("name"),
    email: text("email"),
    company: text("company"),
    interests: formData.getAll("interests").map(String),
    message: text("message"),
    consent: formData.get("consent") === "on",
  };

  const errorText = de.contact.form.errors;
  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = errorText.name;
  if (!EMAIL.test(values.email)) errors.email = errorText.email;
  if (values.message.length < 10) errors.message = errorText.message;
  if (!values.consent) errors.consent = errorText.consent;
  if (Object.keys(errors).length) return { status: "error", attempt, errors, values };

  if (!(await deliver(values))) return { status: "error", attempt, errors: { send: errorText.send }, values };

  return { status: "success", attempt };
}
