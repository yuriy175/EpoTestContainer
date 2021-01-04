import React, { useState, useEffect, useRef, useContext } from 'react';
import DialogButton from '../dialogs/dialogComponents/DialogButton'
import * as Worker from '../../workers/hardwareWorker'

import { HardwareContext } from '../../context/hardware-context';

export default function AddNewStudyDialog(props) {
    const [hardwareState, hardwareDispatch] = useContext(HardwareContext);
    const [userName, setUserName] = React.useState(null);
    const [userDoB, setUserDoB] = React.useState(null);
    const [studyName, setStudyName] = React.useState(null);

    useEffect(() => {
        (async () => {
            if (hardwareState.examinationNames.length === 0) {
                const examinations = await Worker.GetExaminationNames();
                if (examinations) {
                    hardwareDispatch({ type: 'SETEXAMINATIONNAMES', payload: examinations });
                }
            }
        })();
    }, [hardwareState.examinationNames]);

    const handleAddStudy = async () => {
        props.onAdd({userName, userDoB, studyName});
        props.onClose();
    };

    return (
        <div id="addNewStudy" className="dialog">
            <DialogButton caption="Add" onClick={handleAddStudy} />
            <DialogButton caption="Close" onClick={props.onClose} />
        </div>
    );
}