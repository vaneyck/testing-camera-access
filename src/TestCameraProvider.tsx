import { CameraProvider } from "./CameraProvider";

export class MockCameraProvider implements CameraProvider {
  // Check if the camera is ready
  isCameraReady(): boolean {
    return true; // Return true since this is a test
  }

  // Initialize the camera and bind the stream to a video element
  async initializeCamera(videoElement: HTMLVideoElement): Promise<void> {
    // do nothing since this is a test
  }

  // Cleanup camera resources
  cleanup(): void {
    // do nothing
  }

  async captureImage(): Promise<string> {
    return "data:image/png;base64,MOCK_IMAGE_DATA"; // Return a mock Base64 image string
  }
}
