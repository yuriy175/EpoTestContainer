import React, { useContext, useState } from 'react';
import ImageItem from './ImageItem'

const ImagesList = React.memo((props) => {
    console.log('! render ImagesList');
    return (
        <ul>
            {props.Images.map((i, ind) => (
                <li key={ind.toString()}>
                    <ImageItem Image={i}></ImageItem>
                </li>
                ))
            }
        </ul>
    );
});

export default ImagesList;

