import React, { useState, useEffect, useRef, useContext } from 'react';

import { JournalContext } from '../context/journal-context';
import * as JournalWorker from '../workers/journalWorker'
import * as HardwareWorker from '../workers/hardwareWorker'
import { StateContext } from '../context/state-context';

import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from '../context/constants'

export default function JournalPanel(props) {
    const [stateState, stateDispatch] = useContext(StateContext);
    const [journalState, journalDispatch] = useContext(JournalContext);

    console.log('! render journalPanel');

    useEffect(() => {
        (async () => {
            if (journalState.studies.length === 0) {
                const studies = await JournalWorker.GetStudyList({});
                if (studies) {
                    journalDispatch({ type: 'SETSTUDIES', payload: studies });
                }
            }
        })();

    }, [journalState.studies]);

    useEffect(() => {
        (async () => {
            if (journalState.studyInWork?.id) {
                await HardwareWorker.StudyInWork(journalState.studyInWork.id);
                stateDispatch({ type: 'SETAPPMODE', payload: AppModeHardware });
            }
        })();

    }, [journalState.studyInWork]);

    const onGetDosimeterState = async () => {
    }

    return (
        <div id="journalPanel" className={props.className}>

        </div>
    );
}