import React, { useContext, useState } from 'react';
import { ImageContext } from '../../context/image-context';
import StudyList from './StudyList'

export default function PatientList() {
    const [imageState, imageDispatch] = useContext(ImageContext);
    const patients = imageState.patients;
    if(patients.length === 0)
    {
        return <div/>;
    }

    console.log('! render PatientList');
    return (
        <ul>
            {patients.map((p) => (
                <li key={p.Id}>
                    <div className="previewTitle">
                        {p.Name.replaceAll('^',' ')} {p.Sex} {new Date(p.BirthDate)?.toLocaleDateString()}
                    </div>
                    <StudyList Studies={p.Studies}></StudyList>
                </li>
            ))}
        </ul >
    );
}