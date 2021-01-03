import React, { useState, useEffect, useRef, useContext } from 'react';
import * as signalR from '@microsoft/signalr';

import { ImageChatName } from '../context/constants'
import { StateContext } from '../context/state-context';

export function useChat(props) {
    console.log(`useChat ${props.serviceUrl} ${props.chatName}`);

    const [stateState] = useContext(StateContext);
    const [connection, setConnection] = useState(null);

    const fullPath = props.serviceUrl + props.chatName;
    useEffect(() => {
        if (!props.serviceUrl) {
            return;
        }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(fullPath,
                {
                    transport: signalR.HttpTransportType.WebSockets
                })
            .withAutomaticReconnect()
            .build();

            setConnection(newConnection);
    }, [props.serviceUrl]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log(fullPath + ' Connected!');

                    connection.on('Send', response => {
                        props.onMessageArrived(response);
                    });
                })
                .catch(e => {
                    console.log(fullPath + 'failed: ', e);
                });
        }
    }, [connection]);

    return connection;
}

