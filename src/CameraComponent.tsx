import React, { useEffect, useRef, useState } from "react";
import { CameraProvider } from "./CameraProvider.tsx";

interface CameraComponentProps {
  provider: CameraProvider;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ provider }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (videoRef.current) {
          await provider.initializeCamera(videoRef.current);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    initialize();
    return () => provider.cleanup();
  }, [provider]);

  const handleCapture = async () => {
    try {
      if (videoRef.current) {
        const capturedImage = await provider.captureImage(videoRef.current);
        setImage(capturedImage as string);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to capture image");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <>
          <video ref={videoRef} style={{ width: "100%", maxHeight: "300px" }} />
          <button onClick={handleCapture}>
            Capture Image
          </button>
        </>
      )}
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" style={{ width: "300px", maxHeight: "300px" }} />
        </div>
      )}
    </div>
  );
};
