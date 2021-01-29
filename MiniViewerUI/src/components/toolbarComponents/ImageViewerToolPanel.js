import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import ImageManipToolPanel from './ImageManipToolPanel'
import PlayerToolPanel from './PlayerToolPanel'
import PrintToolPanel from './PrintToolPanel'
import { ImageContext } from '../../context/image-context';
import * as Worker from '../../workers/imageWorker'

let num = 0
export default function ImageViewerToolPanel() {
  ++num;
  const [imageState, imageDispatch] = useContext(ImageContext);

  const onLoadImage = async (ev) => {
    const result = await Worker.LoadImage(
      num % 2 == 0 ? '1.2.826.0.1.3680043.2.123.0.8962.0.20210104.193327.3' :
        '1.2.826.0.1.3680043.2.123.0.48956.0.20210104.193434.4', //xif
      num % 2 == 0 ? 21529 : 21530, //xif
    );
  }

  return (
    <div id="miniViewerToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="openButton" onClick={onLoadImage} title="open image" />
      <ImageManipToolPanel></ImageManipToolPanel>
      <PrintToolPanel></PrintToolPanel>
      {imageState?.imageInfo?.FramesNumber > 1 ? <PlayerToolPanel /> : <div />}
    </div>
  );
}