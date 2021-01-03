import React, { useContext, useState } from 'react';
import PatientList from './previewListComponents/PatientsList'

export default function PreviewListPanel(props) {
  return (
    <div id="previewListPanel" className={props.className}>
      <PatientList id="patientList" />
    </div>
  );
}