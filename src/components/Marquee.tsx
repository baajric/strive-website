import { de } from "@/content/de";
import { Sparkle } from "./Sparkle";

/** Tilted band of service names that keeps rolling – the bridge between hero and content. */
export function Marquee() {
  const words = de.services.marquee;

  return (
    <div aria-hidden className="relative z-10 -my-10 overflow-x-clip py-10">
      <div className="-ml-[5%] w-[110%] -rotate-2 bg-ink py-4 shadow-[0_20px_50px_rgba(11,16,32,0.25)] md:py-6">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {words.map((word) => (
                <span key={word} className="flex items-center">
                  <span className="display whitespace-nowrap px-5 text-[clamp(2rem,5.5vw,4.5rem)] text-paper md:px-8">
                    {word}
                  </span>
                  <Sparkle className="h-7 w-7 shrink-0 text-spark md:h-10 md:w-10" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
