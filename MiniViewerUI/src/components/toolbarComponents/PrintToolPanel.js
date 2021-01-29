import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import { ImageContext } from '../../context/image-context';
import { PrintContext } from '../../context/print-context';
import * as Worker from '../../workers/imageWorker'

export default function PrintToolPanel() {
  const [imageState, imageDispatch] = useContext(ImageContext);
  const [printState, printDispatch] = useContext(PrintContext);
  console.log('PrintToolPanel');

  const onPrintImage = async (ev) => {    
    printDispatch({ type: 'SETPRINTEDIMAGE', payload: 1 });
  }

  return (
    <div id="printToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="printImage" onClick={onPrintImage} title="make image print" />
    </div>
  );
}