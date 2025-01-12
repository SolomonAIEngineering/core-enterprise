import { useEffect, useRef, useState } from "react";

import { Logo } from "@dub/ui";
import { cn } from "@dub/utils";

export function ModalHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Video playback failed:", error);
      }
    };

    playVideo();
  }, []);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-white">
      <BackgroundGradient className="opacity-15" />

      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={cn(
            "h-full w-full object-cover object-top transition-opacity duration-1000",
            isVideoLoaded ? "opacity-70" : "opacity-0",
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

      <BackgroundGradient className="opacity-100 mix-blend-soft-light" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="aspect-square h-1/2 rounded-full bg-white">
          <Logo className="size-full" />
        </div>
      </div>
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
      <div
        className="absolute inset-0 saturate-150"
        style={{
          backgroundImage: `conic-gradient(from -25deg at 65% -10%, #3A8BFD 0deg, #FF0000 172.98deg, #855AFC 215.14deg, #FF7B00 257.32deg, #3A8BFD 360deg)`,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}