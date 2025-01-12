"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@dub/utils";
import { usePathname } from "next/navigation";

export function NewBackground({ showAnimation }: { showAnimation?: boolean }) {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const shouldAnimate = showAnimation || pathname === "/onboarding/welcome";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.play().catch((error) => {
        // Retry playback
        setTimeout(() => {
          video?.play();
        }, 1000);
      });
    };

    video.addEventListener("loadeddata", handleLoadedData);

    // If video is already loaded, play it immediately
    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden bg-white transition-all duration-700",
        shouldAnimate
          ? isVideoLoaded
            ? "opacity-100"
            : "opacity-0"
          : "opacity-80",
      )}
    >
      <BackgroundGradient className="opacity-20" />

      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full bg-inherit object-cover filter transition-all duration-1000",
            shouldAnimate ? "opacity-50" : "opacity-0",
          )}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://cdn.dribbble.com/users/32512/screenshots/11231524/media/62f9b46bf8995958881682b2fe90d1b3.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <BackgroundGradient className="opacity-90 mix-blend-overlay" />
    </div>
  );
}

function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 aspect-square w-full overflow-hidden sm:aspect-[2/1]",
        "[mask-image:radial-gradient(70%_100%_at_50%_30%,_black_70%,_#0009)]",
        className,
      )}
    >
      <div className="absolute inset-0 saturate-150" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}