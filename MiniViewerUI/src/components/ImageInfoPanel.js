import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/image-context';
import { FrameInfoContext } from '../context/frameInfo-context';

export default function ImageInfoPanel(props) {
    const [imageState, imageDispatch] = useContext(ImageContext);
    const [frameInfo] = useContext(FrameInfoContext);

    const imageInfo = imageState.imageInfo;

    const imageDate = !imageInfo.ImageDateTime ? null : new Date(imageInfo.ImageDateTime)?.toLocaleDateString() ??
                        !imageInfo.CreationDate ? '' : new Date(imageInfo.CreationDate)?.toLocaleDateString();
    return (
        <div id="imageInfoPanel" className={props.className}>
            <div className="imageInfoTopLeft">
                <div>{imageInfo.PatientName?.replaceAll('^', ' ')}</div>
                <div>ИД: {imageInfo.DicomPatientId ?? imageInfo.DicomUid}</div>
                <div>ДР: {!imageInfo.BirthDate ? '' : new Date(imageInfo.BirthDate)?.toLocaleDateString()}</div>
            </div>
            <div className="imageInfoTopRight">
                <div>Исслед: {imageInfo.StudyName}</div>
            </div>
            <div className="imageInfoBottomLeft">
                <div>Произв: {imageInfo.Manufacturer}</div>
                <div>KVP: {imageInfo.KVP}</div>
                <div>Экспозиция: Кв {imageInfo.Kv}, Маs {imageInfo.Mas}, Ma {imageInfo.Ma}, Ms {imageInfo.Ms}</div>
            </div>
            <div className="imageInfoBottomRight">
                <div>Дата: {imageDate}</div>
                <div>Кадры: {frameInfo.frameNumber + 1}/{imageInfo.FramesNumber ?? imageInfo.FrameCount}</div>
                <div>Инфо: </div>
            </div>
        </div >
    );
}