import type { Metadata } from "next";
import BuildConfigurator from "@/components/cinematic/build/BuildConfigurator";
import { MistBand } from "@/components/cinematic/botanicals";

export const metadata: Metadata = {
  title: "Build Your Jungle",
  description:
    "Answer a few quick questions about your space and we will curate a plant bundle that will actually thrive there.",
};

export default function BuildPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pt-36 lg:pt-44">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40">
          <MistBand accent="#1f5f3f" className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="cine-eyebrow">Build your jungle</span>
          <h1 className="cine-serif mx-auto mt-5 max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)] text-[var(--c-bone)]">
            Tell us the room.
            <br />
            We will pick the{" "}
            <span className="cine-accent text-[var(--c-glow)]">plants</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            Four quick questions about your space and your life, and we will
            curate a bundle that will actually thrive where you put it. No
            guesswork, no doomed impulse buys.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-32 pt-16">
        <BuildConfigurator />
      </section>
    </>
  );
}
