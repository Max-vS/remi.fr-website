"use client";

import { useState, useRef, useEffect } from "react";

const SpotifyPlayer = () => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsIframeLoading(false);
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto bg-system-7">
      <div className="relative" style={{ height: "100%" }}>
        {isIframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2srsJ5?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="This Is rémi.fr"
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
