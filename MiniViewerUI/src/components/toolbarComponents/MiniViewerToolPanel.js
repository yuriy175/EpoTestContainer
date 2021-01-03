import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import ImageManipToolPanel from './ImageManipToolPanel'
import PlayerToolPanel from './PlayerToolPanel'
import SelectDcmDialog from '../dialogs/SelectDcmDialog'
import { ImageContext } from '../../context/image-context';
import * as Worker from '../../workers/miniViewerWorker'

export default function MiniViewerToolPanel() {
  const [imageState, imageDispatch] = useContext(ImageContext);
  const [open, setOpen] = React.useState(false);
  const [selectDcmOpen, setSelectDcmOpen] = React.useState(false);  
  const [dump, setDump] = React.useState('');
  //'data:image/bmp;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==');

  const handleSelectDcmClose = async () => {
    setSelectDcmOpen(false);
  };

  const onLoadImage = async (ev) => {
    setSelectDcmOpen(true);    
  }

  const onGetInfo = async (ev) => {
    const content = await Worker.GetImageInfo();
    setDump(content);
  }

  return (
    <div id="miniViewerToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="openButton" onClick={onLoadImage} title="open image"/>
      <ToolButton btnClass="newToolPanel" svgClass="infoImage" onClick={onGetInfo} title="image info"/>
      <ImageManipToolPanel></ImageManipToolPanel>
      {imageState?.imageInfo?.FramesNumber > 1 ? <PlayerToolPanel /> : <div />}
      {selectDcmOpen ? <SelectDcmDialog onClose={handleSelectDcmClose}></SelectDcmDialog> : <div/>}
    </div>
  );
}