import React from 'react';

import CommonButton from '../commonComponents/CommonButton'
import * as HardwareWorker from '../../workers/hardwareWorker'

export default function ExposurePanel(props) {
    console.log(`! render ExposurePanel ${props.name}`);

    const onUnblock = async () => {
        const result = await HardwareWorker.UnBlockHigh(true);
    }

    const onMakeShot = async () => {
        const result = await HardwareWorker.MakeShot();
    }

    const onMakeSeries = async () => {
        const result = await HardwareWorker.MakeSeries();
    }

    return (
        <div id='exposurePanel'>
            <CommonButton caption="Make Shot" onClick={onMakeShot} />
            <CommonButton caption="Make Series" onClick={onMakeSeries} />
            <CommonButton caption="Unblock" onClick={onUnblock} />
        </div>
    );
};
