"use server";

import { de } from "@/content/de";

type Field = "name" | "email" | "message" | "consent";

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

  // TODO: deliver the enquiry by e-mail (e.g. via Resend) once the Strive inbox is set up.
  console.info("[contact] new enquiry", values);

  return { status: "success", attempt };
}
