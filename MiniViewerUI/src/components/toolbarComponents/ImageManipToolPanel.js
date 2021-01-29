import React, { useContext, useState, useRef } from 'react';
import ToolButton from './ToolButton'

import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from '../../context/constants'
import { StateContext } from '../../context/state-context';
import { ImageContext } from '../../context/image-context';

import * as MiniViewerWorker from '../../workers/miniViewerWorker'
import * as ImageManipWorker from '../../workers/imageWorker'

export default function ImageManipToolPanel() {
  const [stateState] = useContext(StateContext);
  const [imageState] = useContext(ImageContext);
  const invertedRef = useRef(false);
  const rotateRef = useRef(null);

  const isViewerState = stateState.appMode === AppModeMiniViewer;

  const onHorFlip = async (ev) => {
    if (isViewerState) {
      await MiniViewerWorker.HorFlipImage();
    }
  }

  const onVertFlip = async (ev) => {
    if (isViewerState) {
      await MiniViewerWorker.VertFlipImage();
    }
  }

  const onRotate = async (ev) => {
    if (isViewerState) {
      await MiniViewerWorker.RotateImage();
    }
  }

  const onInvert = async (ev) => {
    if (isViewerState) {
      await MiniViewerWorker.InvertImage();
    }
    else {
      invertedRef.current = !invertedRef.current;
      await ImageManipWorker.InvertImage(
        imageState.imageInfo.DicomUid,
        invertedRef.current,
        imageState.imageInfo.Id);
    }
  }

  const onUndo = async (ev) => {
    if (isViewerState) {
      await Worker.UndoImage();
    }
  }

  return (
    <div id="imageManipToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="invertImage" onClick={onInvert} title="invert image" />
      <ToolButton btnClass="sameToolPanel" svgClass="rotateImage" onClick={onRotate} title="rotate image" />
      <ToolButton btnClass="sameToolPanel" svgClass="horFlipImage" onClick={onHorFlip} title="hor flip image" />
      <ToolButton btnClass="sameToolPanel" svgClass="vertFlipImage" onClick={onVertFlip} title="vert flip image" />
      <ToolButton btnClass="sameToolPanel" svgClass="undoImage" onClick={onUndo} title="undo image" />
    </div>
  );
}