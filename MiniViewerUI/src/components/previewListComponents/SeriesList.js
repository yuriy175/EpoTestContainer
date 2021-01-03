import React, { useContext, useState } from 'react';
import ImagesList from './ImagesList'

const SeriesList = React.memo((props) => {
    console.log('! render SeriesList');
    return (
        <ul>
            {props.Series.map(s => 
            (
                <li key={s.Id}>
                    <div className="previewTitle">Серия {s.Number} {s.Modality}</div>
                    <ImagesList Images={s.Images}></ImagesList>
                </li>
            ))}
        </ul>
    );
});

export default SeriesList;