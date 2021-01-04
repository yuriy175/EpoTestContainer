import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import { JournalContext } from '../../context/journal-context';
import * as Worker from '../../workers/journalWorker'

import AddNewStudyDialog from '../dialogs/AddNewStudyDialog'

export default function JournalToolPanel() {
  const [journalState, journalDispatch] = useContext(JournalContext);
  const [addNewStudyOpen, setAddNewStudyOpen] = React.useState(false);

  const getPatient = (name, birthdate) => {
    return {
      surname: name,
      birthDate: birthdate //? null : new Date(birthdate),
    }
  }

  const getStudy = (patient, name) => {
    return {
      patient: patient,
      planStartDate: new Date(),
      name: name,
    }
  }

  const onAddUser = async ({ userName, birthdate, studyName }) => {
    const patient = getPatient(userName ?? 'Vaska', birthdate);
    patient.id = await Worker.AddPatient(patient);
    if (!patient.id) {
      return;
    }

    const studyId = await Worker.AddStudy(getStudy(patient, studyName));
    if (studyId) {
      const study = await Worker.GetStudy(studyId);
      journalDispatch({ type: 'SETSTUDYINWORK', payload: study });
    }
  }

  const handleAddNewStudyOpen = async () => {
    setAddNewStudyOpen(true);
  }

  const onAddStudy = async (study) => {
    await onAddUser(study);
  }

  const onAddUrgent = async () => {
    await onAddUser({ userName: 'Urgent' });
  }

  const handleAddNewStudyClose = async () => {
    setAddNewStudyOpen(false);
  };

  const onLastStudy = async () => {
    const studyId = journalState.studies ?
      Math.max(...journalState.studies.map(s => s.id)) :
      null;
    if (studyId) {
      const study = journalState.studies.filter(s => s.id === studyId)[0];
      journalDispatch({ type: 'SETSTUDYINWORK', payload: study });
    }
  }

  return (
    <div id="journalToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="addUserImage" onClick={handleAddNewStudyOpen} title="add study to named user" />
      <ToolButton btnClass="sameToolPanel" svgClass="addUrgentImage" onClick={onAddUrgent} title="add study to urgent user" />
      <ToolButton btnClass="sameToolPanel" svgClass="addUrgentImage" onClick={onLastStudy} title="get last study to work" />
      {addNewStudyOpen ?
        <AddNewStudyDialog onAdd={onAddStudy} onClose={handleAddNewStudyClose}></AddNewStudyDialog> :
        <div />}
    </div>
  );
}