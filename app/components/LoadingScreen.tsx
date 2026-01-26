"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for page to be fully loaded
    const handleLoad = () => {
      // Show loading screen for 1.5 seconds to allow full rotation
      setTimeout(() => {
        setIsLoading(false);
        // After fade out animation completes, hide the element
        setTimeout(() => {
          setIsVisible(false);
        }, 600); // Match the fade-out duration
      }, 1500); // Show for 1.5 seconds to complete full rotation
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-800 ease-out ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: isLoading ? "auto" : "none" }}
      >
        <div className="relative">
          {/* Globe Logo with slow rotation */}
          <div
            className={`relative transition-all duration-700 ease-out ${
              isLoading ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="globe-container">
              <Image
                src="/globe-logo.png"
                alt="Southbase"
                width={140}
                height={140}
                priority
                className="globe-rotate"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .globe-container {
          position: relative;
          width: 140px;
          height: 140px;
        }

        .globe-rotate {
          animation: fullSpin 1.5s ease-out forwards;
        }

        @keyframes fullSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .globe-rotate {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
