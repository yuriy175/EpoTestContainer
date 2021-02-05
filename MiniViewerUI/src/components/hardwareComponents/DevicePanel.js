import React from 'react';

import CommonButton from '../commonComponents/CommonButton'

//export default function DevicePanel(props) {
const DevicePanel = React.memo((props) => {
    console.log(`! render DevicePanel ${props.name}`);

    const replacer = (key, value) =>
    {
        return value === null ? undefined : value;
    }

    var info = JSON.stringify(props.info, replacer, ' ');
    var state = props.info?.state;

    return (
        <div className='devicePanel'>
            <label>{props.name}</label>    
            <label>Status: {state}</label>
            <textarea className='deviceTextarea' readOnly="readonly" type='text' value={info}>{props.info}</textarea>        
            {props.onGetState && <CommonButton caption="Get State" onClick={props.onGetState} />}
        </div>
    );
});

export default DevicePanel;