import axios from 'axios';
import {HandlerWrapper} from './commonWorker'

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