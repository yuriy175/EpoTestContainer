import React, { useState, useEffect, useRef, useContext } from 'react';
import ImagePropsChat from '../../chats/imagePropsChat';
import DialogButton from '../dialogs/dialogComponents/DialogButton'
import * as Worker from '../../workers/miniViewerWorker'

import { ImageContext } from '../../context/image-context';

export default function SelectDcmDialog(props) {
    const [imageState, imageDispatch] = useContext(ImageContext);
    const [dcmList, setDcmList] = useState(null);
    const [selectedDcm, setSelectedDcm] = React.useState(null);

    useEffect(() => {
        (async () => {
            const dcms = await Worker.GetDcmFiles('');
            setDcmList(dcms);
        })();
    }, []);

    const handleSelectDcm = async () => {
        if (selectedDcm) {
            const result = await Worker.LoadImage(
                selectedDcm,
                // remnant == 1 ?
                //   '1.2.826.0.1.3680043.2.634.0.2295.2014112.231730.1-147393.dcm' :
                //   remnant == 2 ?
                //   '1.2.826.0.1.3680043.2.634.0.2316.20151130.17517.16.dcm' : 
                //   'DICOMDIR',
                imageDispatch);
        }

        props.onClose();
    };

    return (
        <div id="selectDcmDialog" className="dialog">
            <div className="dcmList">
                {dcmList?.map((p, index) => (
                    <label key={index.toString()} className="radioLabel">
                        <input type="radio"
                            checked={selectedDcm === p}
                            onClick={() => setSelectedDcm(p)}
                        ></input>
                        {p}
                    </label>
                ))}
            </div>
            <DialogButton caption="Select" onClick={handleSelectDcm} />
            <DialogButton caption="Close" onClick={props.onClose} />
        </div>
    );
}