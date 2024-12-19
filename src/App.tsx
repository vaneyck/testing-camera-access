import React from 'react';
import './App.css';
import { BrowserCameraProvider } from './BrowserCameraProvider.tsx';
import { CameraComponent } from './CameraComponent.tsx';

function App() {
  const cameraProvider = new BrowserCameraProvider();
  
  return (
    <div className="App">
       <CameraComponent provider={cameraProvider} />
    </div>
  );
}

export default App;
