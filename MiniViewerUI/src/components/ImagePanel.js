import React, { useState, useEffect, useRef, useContext } from 'react';
import * as signalR from '@microsoft/signalr';

import { useChat } from '../chats/useChat'
import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from '../context/constants'

import { ImageChatName } from '../context/constants'
import { StateContext } from '../context/state-context';
import { ImageContext } from '../context/image-context';
import { PrintContext } from '../context/print-context';

import * as MiniViewerWorker from '../workers/miniViewerWorker'
import * as ImageManipWorker from '../workers/imageWorker'

export default function ImagePanel(props) {
  console.log('ImagePanel');

  const [stateState] = useContext(StateContext);
  const [imageState] = useContext(ImageContext);
  const [printState] = useContext(PrintContext);
  //const [miniViewerConnection, setMiniViewerConnection] = useState(null);
  //const [imageManipConnection, setImageManipConnection] = useState(null);
  const usingMouse = useRef(false);
  const imageRef = useRef(null);
  const stageCanvasRef = useRef(null);
  const wlRef = useRef(null);
  const zoomRef = useRef(1);

  const isViewerState = stateState.appMode === AppModeMiniViewer;

  let initialRightPos = { x: 0, y: 0 };
  let initialLeftPos = { x: 0, y: 0 };

  const OnWLChanged = async (ev) => {
    const changeLimitValue = 30;
    let deltaCenter = null, deltaWidth = null;
    if (Math.abs(ev.screenX - initialRightPos.x) >= changeLimitValue) {
      deltaCenter = ev.screenX - initialRightPos.x;
      initialRightPos = { x: ev.screenX, y: initialRightPos.y };
    }
    if (Math.abs(ev.screenY - initialRightPos.y) >= changeLimitValue) {
      deltaWidth = ev.screenY - initialRightPos.y;
      initialRightPos = { x: initialRightPos.x, y: ev.screenY };
    }

    if (!deltaCenter && !deltaWidth) {
      return;
    }
    if (isViewerState) {
      await MiniViewerWorker.SetImageWindowLevel(
        deltaCenter ? deltaCenter > 0 : null,
        deltaWidth ? deltaWidth > 0 : null);
    }
    else {
      if (wlRef) {
        const windowCenter = wlRef.current.WindowCenter - deltaCenter * 10;
        const windowWidth = wlRef.current.WindowWidth - deltaWidth * 10;
        wlRef.current = {
          WindowCenter: windowCenter < 1 ? 1 : windowCenter,
          WindowWidth: windowWidth < 1 ? 1 : windowWidth,
        };

        await ImageManipWorker.SetViewRange(
          imageState.imageInfo.DicomUid,
          wlRef.current.WindowWidth,
          wlRef.current.WindowCenter,
          imageState.imageInfo.Id);
      }
    }
  }

  const OnOffsetChanged = async (ev) => {
    const changeLimitValue = 30;
    const offsetX = ev.screenX - initialRightPos.x;
    const offsetY = ev.screenY - initialRightPos.y;

    console.log(`OnOffsetChanged ${offsetX} ${offsetY}`);
    if (isViewerState) {
    }
    else {

      await ImageManipWorker.MoveImage(
        imageState.imageInfo.DicomUid,
        offsetX,
        -offsetY,
        imageState.imageInfo.Id);

      console.log(`OnOffsetChanged complete`);

      /*if (wlRef) {
        const windowCenter = wlRef.current.WindowCenter - deltaCenter * 10;
        const windowWidth = wlRef.current.WindowWidth - deltaWidth * 10;
        wlRef.current = {
          WindowCenter: windowCenter < 1 ? 1 : windowCenter,
          WindowWidth: windowWidth < 1 ? 1 : windowWidth,
        };

        await ImageManipWorker.SetViewRange(
          imageState.imageInfo.DicomUid,
          wlRef.current.WindowWidth,
          wlRef.current.WindowCenter,
          imageState.imageInfo.Id);
      }*/
    }
  }

  const handleWheel = async (ev) => {
    if (!usingMouse.current) {
      usingMouse.current = true;
      console.log('preWheel');
      const delta = Math.sign(ev.deltaY);
      if (isViewerState) {
        await (delta < 0 ? MiniViewerWorker.ScaleDown() : MiniViewerWorker.ScaleUp());
      }
      else {
        const zoom = zoomRef.current + delta * 0.1;
        zoomRef.current = zoom < 0.5 ? 0.5 : zoom > 5 ? 5 : zoom;
        await ImageManipWorker.ZoomImage(
          imageState.imageInfo.DicomUid,
          zoomRef.current,
          imageState.imageInfo.Id);
      }
    }

    console.log('postWheel');
    usingMouse.current = false;
  }

  const handleMouseMove = async (ev) => {
    if (!usingMouse.current) {
      usingMouse.current = true;
      ev.preventDefault()

      if (ev.buttons & 1 || (ev.buttons === undefined && EventSource.which == 3)) {
        await OnOffsetChanged(ev);
      } else if (ev.buttons & 2 || (ev.buttons === undefined && EventSource.which == 3)) {
        //await OnWLChanged(ev);
        await OnOffsetChanged(ev);
      }

      usingMouse.current = false;
    }
  }

  const handleMouseDown = async (ev) => {
    if (ev.nativeEvent.which === 1) {
      initialLeftPos = { x: ev.screenX, y: ev.screenY };
    } else if (ev.nativeEvent.which === 3) {
      initialRightPos = { x: ev.screenX, y: ev.screenY };
    }
  }

  const miniViewerConnection = useChat(
    {
      serviceUrl: stateState.miniViewerServiceUrl,
      chatName: ImageChatName,
      onMessageArrived: (response) => {
        const data = response;
        if (imageRef) {
          imageRef.current.src = data;
        }
      }
    }
  );

  const imageManipConnection = useChat(
    {
      serviceUrl: stateState.imageServiceUrl,
      chatName: ImageChatName,
      onMessageArrived: (response) => {
        const data = JSON.parse(response);
        //setImageData(data);
        if (imageRef) {
          imageRef.current.src = data.ImageData;
        }

        wlRef.current = {
          WindowCenter: data.WindowCenter,
          WindowWidth: data.WindowWidth
        };
      }
    }
  );

  useEffect(() => {
    (async () => {
      if (stageCanvasRef && stageCanvasRef.current) {
        const offsetWidth = stageCanvasRef.current.offsetWidth;
        const offsetHeight = stageCanvasRef.current.offsetHeight;
        await MiniViewerWorker.SetImageSize(offsetWidth, offsetHeight);
        await ImageManipWorker.SetImageSize(offsetWidth, offsetHeight);
      }
    })();

  }, [stageCanvasRef]);

  useEffect(() => {
    (async () => {
      // if (printState.printedImage && imageRef) {
      //     imageRef.current.src = printState.printedImage;
      // }
      if (!imageState.imageInfo) {
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
            ImageId: imageState.imageInfo.Id,
            ImageUid: imageState.imageInfo.DicomUid,
            SaveImage: {
              DisplayOffsetX: 500,
              DisplayOffsetY: 500,
              Scale: zoomRef.current
            }
          }
        ]
      }
      const printedImage = await ImageManipWorker.GetPrintableImage(imageProps);
      if (printedImage && imageRef) {
        imageRef.current.src = printedImage;
      }
    })();

  }, [printState.printedImage]);

  return (
    <div id="imagePanel" ref={stageCanvasRef} className={props.className}>
      <img ref={imageRef}
        onWheel={(e) => handleWheel(e)}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}