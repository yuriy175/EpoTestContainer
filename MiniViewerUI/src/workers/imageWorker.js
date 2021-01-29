import axios from 'axios';
import {HandlerWrapper, GetJsonHeader} from './commonWorker'

const ImageManipulationController = '/ImageManipulation';
let ImageManipulationServiceAddress = '';

export function SetImageManipulationServiceAddress(serviceAddress) {
    ImageManipulationServiceAddress = serviceAddress;
}

export async function LoadImage(imageUid, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('LoadImage', async () => {
        const response = await axios.get(ImageManipulationServiceAddress + ImageManipulationController + 
            '/LoadImage?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

export async function SetImageSize(width,  height, imageUid = 'imageUid', imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('SetImageSize', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/SetImageSize?imageId=' + (imageId ?? '')
            + '&imageUid=' + (imageUid ?? '')
            + '&width=' + width 
            + '&height=' + height 
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

//
export async function SetViewRange(imageUid, windowWidth, windowCenter, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('SetViewRange', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/SetViewRange?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&windowWidth='+ windowWidth
            + '&windowCenter='+ windowCenter
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

export async function ZoomImage(imageUid, zoom, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('ZoomImage', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/ZoomImage?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&zoom='+ zoom
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

export async function MoveImage(imageUid, offsetX, offsetY, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('MoveImage', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/MoveImage?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&offsetX='+ offsetX
            + '&offsetY='+ offsetY
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};
//

export async function RotateImage(imageUid, angle, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('RotateImage', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/RotateImage?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&angle='+ angle
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

export async function MirrorImage(imageUid, vertMirror = null, horMirror = null, imageId = null, multiFrameNumber = null) {
    return await HandlerWrapper('MirrorImage', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController + 
            '/MirrorImage?imageId=' + (imageId ?? '')
            + '&imageUid=' + imageUid 
            + '&vertMirror='+ (vertMirror ?? '')
            + '&horMirror='+ (horMirror ?? '')
            + '&multiFrameNumber=' + (multiFrameNumber ?? ''));
        return response;
    });
};

export async function GetPrintableImage(imageProps) {
    return await HandlerWrapper('GetPrintableImage', async () => {
        const response = await axios.post(ImageManipulationServiceAddress + ImageManipulationController +
            '/GetPrintableImage',
            JSON.stringify(imageProps),
            GetJsonHeader());
        return response.data;
    });
};