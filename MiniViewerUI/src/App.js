import React, { useContext, useState } from 'react';
import './styles/main.css';
import './styles/desktop.css';

import ToolBar from './components/ToolBar';
import PreviewListPanel from './components/PreviewListPanel';
import ImagePanel from './components/ImagePanel';
import ImageInfoPanel from './components/ImageInfoPanel';
import WindowLevelPanel from './components/WindowLevelPanel';
import HardwarePanel from './components/HardwarePanel';
import JournalPanel from './components/JournalPanel';
import ImagePropsChat from './chats/imagePropsChat';

import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from './context/constants'
import { StateContext } from './context/state-context';

function App() {
  const [stateState] = useContext(StateContext);
 const isImagePanels = stateState.appMode === AppModeMiniViewer || stateState.appMode === AppModeImage;

  return (
    <div id="rootApp">
      <ToolBar />
      <HardwarePanel className={stateState.appMode === AppModeHardware ? 'visible ' : 'hidden'} />
      <PreviewListPanel className={isImagePanels ? 'visible' : 'hidden'} />
      <ImagePanel className={isImagePanels ? 'visible' : 'hidden'} />
      <WindowLevelPanel className={isImagePanels ? 'visible' : 'hidden'} />
      <ImageInfoPanel className={isImagePanels ? 'visible' : 'hidden'} />
      <ImagePropsChat className={isImagePanels ? 'visible' : 'hidden'} />
      <JournalPanel className={stateState.appMode === AppModeJournal ? 'visible ' : 'hidden'} />
    </div>
  );
}

export default App; 
