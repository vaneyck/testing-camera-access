# Camera Capture React Component

This project provides a modular React component and a provider-based abstraction to handle camera access, image capture, and video stream initialization. It includes:
- A `CameraProvider` interface to manage camera functionality and testing.
- A `BrowserCameraProvider` for real-world camera interaction using the browser's MediaDevices API.
- A `CameraComponent` React component for displaying the camera stream and capturing images.

## Features

- **Camera Initialization**: Handles permissions and sets up the video stream.
- **Image Capture**: Captures an image from the video feed as a Base64 string.
- **Testing Support**: Enables mock providers for test environments.
- **Resource Cleanup**: Properly stops video streams when components unmount.

---

## Code Overview

### CameraProvider Interface

Defines the methods for:
1. **Initializing the Camera**: `initializeCamera(videoElement: HTMLVideoElement)`
2. **Checking Readiness**: `isCameraReady()`
3. **Capturing an Image**: `captureImage(videoElement: HTMLVideoElement)`
4. **Cleaning Up**: `cleanup()`

### BrowserCameraProvider

Implements `CameraProvider` for browser-based environments, utilizing the `navigator.mediaDevices` API for permissions and streaming.

### CameraComponent

A React component that:
1. Initializes the camera using the provided `CameraProvider`.
2. Displays the video stream.
3. Allows the user to capture images.
4. Cleans up resources on unmount.

---

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:vaneyck/testing-camera-access.git
   ```
2. Navigate to the project directory:
   ```bash
   cd camera-capture-react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Step 1: Import Components

```tsx
import { BrowserCameraProvider } from "./BrowserCameraProvider";
import { CameraComponent } from "./CameraComponent";
```

### Step 2: Initialize the Provider

Create an instance of `BrowserCameraProvider`:
```tsx
const cameraProvider = new BrowserCameraProvider();
```

### Step 3: Use the CameraComponent

Pass the `CameraProvider` instance as a prop:
```tsx
<CameraComponent provider={cameraProvider} />
```

### Example App

```tsx
import React from "react";
import { BrowserCameraProvider } from "./BrowserCameraProvider";
import { CameraComponent } from "./CameraComponent";

const App: React.FC = () => {
  const cameraProvider = new BrowserCameraProvider();

  return (
    <div>
      <h1>Camera Capture Example</h1>
      <CameraComponent provider={cameraProvider} />
    </div>
  );
};

export default App;
```

---

## Testing

Use the `TestCameraProvider` for testing purposes:
```typescript
export class TestCameraProvider implements CameraProvider {
  isCameraReady(): boolean {
    return true;
  }
  async initializeCamera(videoElement: HTMLVideoElement): Promise<void> {
    // Mock initialization
  }
  async captureImage(): Promise<string> {
    return "data:image/png;base64,MOCK_IMAGE_DATA";
  }
  cleanup(): void {
    // Mock cleanup
  }
}
```

---

## Cleanup

The `CameraProvider` automatically stops the video stream when `cleanup` is called. Ensure this is handled properly by calling `provider.cleanup()` in the `useEffect` cleanup function of your component.

---

## License

This project is licensed under the MIT License.
