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
      birthDate: birthdate,
    }
  }

  const getStudy = (patient, name) => {
    return {
      patient: patient,
      planStartDate: new Date(),
      name: name,
    }
  }

  const onAddUser = async (userName, birthdate, studyName) => {
    const patient = getPatient(userName, birthdate);
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
    await onAddUser('Vaska');
  }

  const onAddUrgent = async () => {
    await onAddUser('Urgent');
  }

  const handleAddNewStudyClose = async () => {
    setAddNewStudyOpen(false);
  };

  return (
    <div id="journalToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="addUserImage" onClick={handleAddNewStudyOpen} title="add study to named user" />
      <ToolButton btnClass="sameToolPanel" svgClass="addUrgentImage" onClick={onAddUrgent} title="add study to urgent user" />
      {addNewStudyOpen ?
        <AddNewStudyDialog onAdd={handleAddNewStudyClose} onClose={handleAddNewStudyClose}></AddNewStudyDialog> :
        <div />}
    </div>
  );
}