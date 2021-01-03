import React, { useState, useEffect, useRef, useContext } from 'react';
import { useChat } from './useChat'

import { AcquireChatName } from '../context/constants'
import { StateContext } from '../context/state-context';

const GeneratorType = 1;
const DosimeterType = 4;
const CollimatorType = 5;
const StandType = 6;
const EcpType = 7;
const DetectorType = 'Detector';

const AcquireChat = (props) => {
    const [stateState] = useContext(StateContext);
    
    const hardwareConnection = useChat(
        {
            serviceUrl: stateState.hardwareServiceUrl,
            chatName: AcquireChatName,
            onMessageArrived: (response) => {
                const message = JSON.parse(response);
                if (message.item3 === DetectorType) {
                    props.onDetectorChanged(message.item2);
                    return;
                }
                else {
                    // generator
                    if (message.item1 === GeneratorType) {
                        props.onGeneratorChanged(message.item2);
                        return;
                    }
                    else if (message.item1 === StandType) {
                        props.onStandChanged(message.item2);
                        return;
                    }
                    else if (message.item1 === EcpType) {
                        props.onEcpChanged(message.item2);
                        return;
                    }
                    else if (message.item1 === CollimatorType) {
                        props.onCollimatorChanged(message.item2);
                        return;
                    }
                }
            }
        }
    );

    return (
        <div>
        </div>
    );
};

export default AcquireChat;