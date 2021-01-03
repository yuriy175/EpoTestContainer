import React, { useState, useEffect, useRef, useContext } from 'react';
import * as signalR from '@microsoft/signalr';

import { useChat } from '../chats/useChat'

import { ImageChatName } from '../context/constants'
import { StateContext } from '../context/state-context';

import * as MiniViewerWorker from '../workers/miniViewerWorker'
import * as ImageManipWorker from '../workers/imageWorker'

export default function ImagePanel(props) {
  console.log('ImagePanel');

  const [stateState] = useContext(StateContext);
  //const [miniViewerConnection, setMiniViewerConnection] = useState(null);
  //const [imageManipConnection, setImageManipConnection] = useState(null);
  const usingMouse = useRef(false);
  const imageRef = useRef(null);
  const stageCanvasRef = useRef(null);


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

    if (deltaCenter || deltaWidth) {
      await MiniViewerWorker.SetImageWindowLevel(
        deltaCenter ? deltaCenter > 0 : null,
        deltaWidth ? deltaWidth > 0 : null);
    }
  }

  const handleWheel = async (ev) => {
    if (!usingMouse.current) {
      usingMouse.current = true;
      console.log('preWheel');
      const delta = Math.sign(ev.deltaY);
      await (delta < 0 ? MiniViewerWorker.ScaleDown() : MiniViewerWorker.ScaleUp());
      console.log('postWheel');
      usingMouse.current = false;
    }
  }

  const handleMouseMove = async (ev) => {
    if (!usingMouse.current) {
      usingMouse.current = true;
      ev.preventDefault()

      if (ev.buttons & 1 || (ev.buttons === undefined && ev.which == 1)) {
        console.log('left button pressed');
      } else if (ev.buttons & 2 || (ev.buttons === undefined && EventSource.which == 3)) {
        await OnWLChanged(ev);
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