import React, { useState, useEffect, useRef, useContext } from 'react';
import { useChat } from './useChat'

import * as signalR from '@microsoft/signalr';

import { ImagePropsChatName } from '../context/constants'
import { StateContext } from '../context/state-context';
import { ImageContext } from '../context/image-context';
import { FrameInfoContext } from '../context/frameInfo-context';

const ImagePropsChat = () => {
    const [stateState] = useContext(StateContext);
    const [imageState, imageDispatch] = useContext(ImageContext);
    const [frameInfo, frameInfoDispatch] = useContext(FrameInfoContext);
    
    const miniViewerConnection = useChat(
        {
            serviceUrl: stateState.miniViewerServiceUrl,
            chatName: ImagePropsChatName,
            onMessageArrived: (response) => {
                const message = JSON.parse(response);

                switch (message.Type) {
                    case "DicomDirInfo":
                        {
                            imageDispatch({
                                type: message.Data.DicomDirPath ? 'SETDICOMDIR' : 'SETPATIENTS',
                                payload: message.Data.Patients,
                            });
                            break;
                        }
                    case "ImageInfo":
                        {
                            imageDispatch({
                                type: 'SETIMAGEINFO',
                                payload: message.Data,
                            });
                            break;
                        }
                    case "FrameNumber":
                        {
                            frameInfoDispatch({
                                type: 'SETFRAMENUMBER',
                                payload: message.Data,
                            });
                            break;
                        }
                }
            }
        }
    );

    const imageManipConnection = useChat(
        {
            serviceUrl: stateState.imageServiceUrl,
            chatName: ImagePropsChatName,
            onMessageArrived: (response) => {
                const message = JSON.parse(response);
                imageDispatch({
                    type: 'SETIMAGEINFO',
                    payload: message,
                });
            }
        }
    );

    return (
        <div>
        </div>
    );
};

export default ImagePropsChat;