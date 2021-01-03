import React from 'react';

export default function CommonButton(props) {
    return (
        <div className={'commonButton '} onClick={props.onClick} >
            {props.caption}
        </div>
    );
}