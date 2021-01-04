import React, { useState, useEffect, useRef, useContext } from 'react';
import DialogButton from '../dialogs/dialogComponents/DialogButton'
import DialogInput from '../dialogs/dialogComponents/DialogInput'
import * as Worker from '../../workers/hardwareWorker'

import { HardwareContext } from '../../context/hardware-context';

export default function AddNewStudyDialog(props) {

    const [hardwareState, hardwareDispatch] = useContext(HardwareContext);
    const [userName, setUserName] = React.useState(null);
    const [birthdate, setUserDoB] = React.useState(null);
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
        props.onAdd({ userName, birthdate, studyName });
        props.onClose();
    };

    const onUserNameChanged = async (ev) => {
        setUserName(ev.target.value);
    }

    const onUserBirthdayChanged = async (ev) => {
        setUserDoB(ev.target.value);
    }

    const onStudyNameChanged = async (ev) => {
        setStudyName(ev.target.value);
    }

    const examinationNames = hardwareState.examinationNames;
    return (
        <div id="addNewStudy" className="dialog">
            <div id="addNewStudyInputs">
                <DialogInput title='User name' onChange={onUserNameChanged} />
                <DialogInput type='date' title='User birth date' onChange={onUserBirthdayChanged} />
                <select name="examinations" id="examinationNamesSelect" onChange={onStudyNameChanged}>
                    {examinationNames?.map((p, index) => (
                        <option value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <DialogButton caption="Add" onClick={handleAddStudy} />
            <DialogButton caption="Close" onClick={props.onClose} />
        </div>
    );
}