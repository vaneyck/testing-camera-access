export interface CameraProvider {
  // Check if the camera is ready
  isCameraReady(): boolean;

  // Initialize the camera and bind the stream to a video element
  initializeCamera(videoElement: HTMLVideoElement): Promise<void>;

  // Capture an image from the video stream
  captureImage(videoElement: HTMLVideoElement): Promise<string | Blob>;

  // Cleanup camera resources
  cleanup(): void;
}