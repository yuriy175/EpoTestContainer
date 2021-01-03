import React, { useContext, useState } from 'react';
import SeriesList from './SeriesList'

const StudyList = React.memo((props) => {
    console.log('! render StudyList');
    return (
        <ul>
            {props.Studies.map(s => 
            (
                <li key={s.Id}>
                    <div className="previewTitle">Исследование {new Date(s.Date)?.toLocaleDateString()}</div>
                    <SeriesList Series={s.Series}></SeriesList>
                </li>
            ))}
        </ul>
    );
});

export default StudyList;