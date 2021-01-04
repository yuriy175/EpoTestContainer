import React, { useState } from 'react';

export default function DialogInput(props) {
    const [item, setItem] = React.useState(null);

    return (
        <fieldset>
            <legend>{props.title}</legend>
            <input className={'dialogInput'} value={item} type={props.type ?? 'text'} onChange={props.onChange}></input>
        </fieldset>
    ); 
}