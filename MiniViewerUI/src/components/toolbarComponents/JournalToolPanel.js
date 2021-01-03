import React, { useContext, useState } from 'react';
import ToolButton from './ToolButton'
import { JournalContext } from '../../context/journal-context';
import * as Worker from '../../workers/journalWorker'

export default function JournalToolPanel() {
  const [journalState, journalDispatch] = useContext(JournalContext);
  const [open, setOpen] = useState(false);

  const getPatient = (name) => {
    return {
      surname: name,
    }
  }

  const getStudy = (patient) => {
    return {
      patient: patient,
      planStartDate: new Date(),
    }
  }

  const onAddUser = async (name) => {
    const patient = getPatient(name);
    patient.id = await Worker.AddPatient(patient);
    if (!patient.id) {
      return;
    }

    const studyId = await Worker.AddStudy(getStudy(patient));
    if (studyId) {
      const study = await Worker.GetStudy(studyId);
      journalDispatch({ type: 'SETSTUDYINWORK', payload: study });      
    }
  }

  const onAddStudy = async () => {
    await onAddUser('Vaska');
  }

  const onAddUrgent = async () => {
    await onAddUser('Urgent');
  }

  return (
    <div id="journalToolPanel">
      <ToolButton btnClass="newToolPanel" svgClass="addUserImage" onClick={onAddStudy} title="add study to named user" />
      <ToolButton btnClass="sameToolPanel" svgClass="addUrgentImage" onClick={onAddUrgent} title="add study to urgent user" />
    </div>
  );
}