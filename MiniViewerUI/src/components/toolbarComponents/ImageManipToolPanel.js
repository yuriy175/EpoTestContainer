import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import * as Worker from '../../workers/miniViewerWorker'

export default function ImageManipToolPanel() {
  
  const onHorFlip = async (ev) => {
    await Worker.HorFlipImage();
  }

  const onVertFlip = async (ev) => {
    await Worker.VertFlipImage();
  }

  const onRotate = async (ev) => {
    await Worker.RotateImage();
  }

  const onInvert = async (ev) => {
    await Worker.InvertImage();
  }

  const onUndo = async (ev) => {
    await Worker.UndoImage();
  }

  return (
    <div id="imageManipToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="invertImage" onClick={onInvert} title="invert image"/>
      <ToolButton btnClass="sameToolPanel" svgClass="rotateImage" onClick={onRotate} title="rotate image"/>
      <ToolButton btnClass="sameToolPanel" svgClass="horFlipImage" onClick={onHorFlip} title="hor flip image"/>
      <ToolButton btnClass="sameToolPanel" svgClass="vertFlipImage" onClick={onVertFlip} title="vert flip image"/>
      <ToolButton btnClass="sameToolPanel" svgClass="undoImage" onClick={onUndo} title="undo image"/>
    </div>
  );
}