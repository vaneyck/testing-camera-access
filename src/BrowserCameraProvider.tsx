import { CameraProvider } from "./CameraProvider.tsx";

export class BrowserCameraProvider implements CameraProvider {
  private stream: MediaStream | null = null;

  isCameraReady(): boolean {
    return this.stream !== null;
  }

  async initializeCamera(videoElement: HTMLVideoElement): Promise<void> {
    if (!this.stream) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoElement.srcObject = this.stream;
        // Video stream is not available immediately, so we need to wait for it to load
        try {
          await videoElement.play();
        } catch (error) {
          if (error.name === "AbortError") {
            console.error(
              "Failed to play the video: The play() request was interrupted by a new load request."
            );
            // Handle the AbortError specifically
          } else {
            console.error("Failed to play the video:", error);
            // Handle other potential errors
          }
        }
      } catch (error) {
        console.error("Failed to initialize camera:", error);
        throw new Error("Failed to initialize camera: " + error.message);
      }
    }
  }

  async captureImage(videoElement: HTMLVideoElement): Promise<string> {
    if (!this.stream) {
      throw new Error("Camera is not initialized.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }

    return canvas.toDataURL("image/png"); // Returns Base64 image
  }

  cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}
