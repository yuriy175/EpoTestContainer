import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/main.css';
import { ImageContextProvider } from './context/image-context';
import { StateContextProvider } from './context/state-context';
import { FrameInfoContextProvider } from './context/frameInfo-context';
import { HardwareContextProvider } from './context/hardware-context';
import { JournalContextProvider } from './context/journal-context';

ReactDOM.render(
  <StateContextProvider>
    <JournalContextProvider>
      <ImageContextProvider>
        <FrameInfoContextProvider>
          <HardwareContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HardwareContextProvider>
        </FrameInfoContextProvider>
      </ImageContextProvider>
    </JournalContextProvider>
  </StateContextProvider>,
  document.getElementById('root')
);

