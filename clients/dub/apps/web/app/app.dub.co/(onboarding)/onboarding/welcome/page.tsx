import { BusinessConfig as platform } from "@dub/platform-config";
import { Logo } from "@dub/ui";
import { NextButton } from "../next-button";
import TrackSignup from "./track-signup";

export default function Welcome() {
  const pulseAnimations = Array(3)
    .fill(null)
    .map((_, i) => (
      <div
        key={`pulse-${i}-${Math.random()}`}
        className="animate-pulse-scale absolute inset-0 rounded-full mix-blend-color-burn"
        style={{
          animationDelay: `${i * -2}s`,
          backgroundImage: "linear-gradient(90deg, #000, transparent, #000)",
        }}
      />
    ));

  return (
    <>
      <TrackSignup />
      <main className="relative mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-3 text-center">
        <div className="animate-slide-up-fade relative flex w-auto items-center justify-center px-6 py-2 [--offset:20px] [animation-duration:1.3s] [animation-fill-mode:both]">
          <div className="absolute inset-0 opacity-10">{pulseAnimations}</div>
          <Logo className="relative h-10 w-10" />
        </div>

        <h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
          Welcome to {platform.company}
        </h1>

        <p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
          {platform.description}
        </p>

        <div className="animate-slide-up-fade mt-10 w-full [--offset:10px] [animation-delay:750ms] [animation-duration:1s] [animation-fill-mode:both]">
          <NextButton text="Get started" step="workspace" />
        </div>
      </main>
    </>
  );
}
