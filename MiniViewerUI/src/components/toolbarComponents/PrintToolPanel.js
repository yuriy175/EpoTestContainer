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
    if(!imageState.imageInfo)
    {
      return;
    }
    
    const imageProps = {
      Bits: 8,
      Width: 1000,
      Height: 1000,
      IsLandscape: true,
      ShowAttributes: true,
      PrintableImageViewModels: [
        {
          ImageId : imageState.imageInfo.Id,
          ImageUid: imageState.imageInfo.DicomUid,
          SaveImage: {
            DisplayOffsetX :0,
            DisplayOffsetY :0,
            Scale: 5
          }
        }
      ]
    }
    const image = await Worker.GetPrintableImage(imageProps);
    printDispatch({ type: 'SETPRINTEDIMAGE', payload: image });
  }

  return (
    <div id="printToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="printImage" onClick={onPrintImage} title="make image print" />
    </div>
  );
}