import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import ImageManipToolPanel from './ImageManipToolPanel'
import PlayerToolPanel from './PlayerToolPanel'
import { ImageContext } from '../../context/image-context';
import * as Worker from '../../workers/imageWorker'

let num = 0
export default function ImageViewerToolPanel() {
  ++num;
  const [imageState, imageDispatch] = useContext(ImageContext);

  const onLoadImage = async (ev) => {
    const result = await Worker.LoadImage(
      num % 2 == 0 ? '454417' :
        '983868', //xif
      num % 2 == 0 ? 37 : 28, //xif
    );
  }

  return (
    <div id="miniViewerToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="openButton" onClick={onLoadImage} title="open image" />
      <ImageManipToolPanel></ImageManipToolPanel>
      {imageState?.imageInfo?.FramesNumber > 1 ? <PlayerToolPanel /> : <div />}
    </div>
  );
}