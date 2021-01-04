import React, { useContext, useState } from 'react';
import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from '../context/constants'

import ToolButton from './toolbarComponents/ToolButton'
import MiniViewerToolPanel from './toolbarComponents/MiniViewerToolPanel'
import ImageViewerToolPanel from './toolbarComponents/ImageViewerToolPanel'
import JournalToolPanel from './toolbarComponents/JournalToolPanel'

import { StateContext } from '../context/state-context';
import { JournalContext } from '../context/journal-context';

export default function ToolbarBar() {

  const [stateState, stateDispatch] = useContext(StateContext);
  const [journalState, journalDispatch] = useContext(JournalContext);

  const onJournal = async (ev) => {
    journalDispatch({ type: 'CLEARSTUDYINWORK', payload: true });
    stateDispatch({ type: 'SETAPPMODE', payload: AppModeJournal });
  }

  const onHardware = async (ev) => {
    stateDispatch({ type: 'SETAPPMODE', payload: AppModeHardware });
  }

  const onMiniViewer = async (ev) => {
    stateDispatch({ type: 'SETAPPMODE', payload: AppModeMiniViewer });
  }

  const onImageManip = async (ev) => {
    stateDispatch({ type: 'SETAPPMODE', payload: AppModeImage });
  }

  return (
    <div id="toolbar">
      <ToolButton btnClass="newToolPanel" svgClass="journalImage" onClick={onJournal} title="show journal" />
      <ToolButton btnClass="sameToolPanel" svgClass="hardwareImage" onClick={onHardware} title="show hardware" />
      <ToolButton btnClass="sameToolPanel" svgClass="miniViewerImage" onClick={onImageManip} title="show image manip" />
      <ToolButton btnClass="sameToolPanel" svgClass="miniViewerImage" onClick={onMiniViewer} title="show miniViewer" />
      {stateState.appMode === AppModeMiniViewer ? <MiniViewerToolPanel /> : <div />}
      {stateState.appMode === AppModeImage ? <ImageViewerToolPanel /> : <div />}
      {stateState.appMode === AppModeJournal ? <JournalToolPanel /> : <div />}
    </div>
  );
}