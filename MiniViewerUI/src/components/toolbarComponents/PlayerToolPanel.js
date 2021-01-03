import React, { useContext, useState, useEffect } from 'react';
import ToolButton from './ToolButton'
import { ImageContext } from '../../context/image-context';
import * as Worker from '../../workers/miniViewerWorker'

export default function PlayerToolPanel() {
  const [imageState, imageDispatch] = useContext(ImageContext);
  const [frameRate, setFrameRate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const val = !imageState?.imageInfo?.FrameRate ? 8 : imageState.imageInfo.FrameRate;
    setFrameRate(val);
  }, [imageState?.imageInfo]);

  const frameRateChange = async (event) => {
    const val = event.target.value;
    await Worker.SetFrameRate(val);
    setFrameRate(val);
  }

  const onStartPlay = async (ev) => {
    await Worker.StartPlay();
    setIsPlaying(true);
  }

  const onStopPlay = async (ev) => {
    await Worker.StopPlay();
    setIsPlaying(false);
  }

  const onPlayFirst = async (ev) => {
    await Worker.PlayFirst();
  }

  const onPlayPrev = async (ev) => {
    await Worker.PlayPrev();
  }

  const onPlayNext = async (ev) => {
    await Worker.PlayNext();
  }

  const onPlayLast = async (ev) => {
    await Worker.PlayLast();
  }

  return (
    <div id="playToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="playFirstImage" onClick={onPlayFirst} title="play first frame"/>
      <ToolButton btnClass="sameToolPanel" svgClass="playPrevImage" onClick={onPlayPrev} title="play prev frame"/>
      {!isPlaying ?
        <ToolButton btnClass="sameToolPanel" svgClass="startPlayImage" onClick={onStartPlay} title="start play"/> :
        <ToolButton btnClass="sameToolPanel" svgClass="stopPlayImage" onClick={onStopPlay} title="stop play"/>}
      <ToolButton btnClass="sameToolPanel" svgClass="playNextImage" onClick={onPlayNext} title="play next frame"/>
      <ToolButton btnClass="sameToolPanel" svgClass="playLastImage" onClick={onPlayLast} title="play last frame"/>
      <div id='frameRateRange' className="sameToolPanel" title={frameRate}>
        <input type="range" min="1" max="30" value={frameRate} onChange={frameRateChange}></input>
      </div>
    </div>
  );
}