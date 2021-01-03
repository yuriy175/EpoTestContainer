import React from 'react';

export default function DialogButton(props) {
    return (
        <div className={'dialogButton '} onClick={props.onClick} >
            {props.caption}
        </div>
    );
}