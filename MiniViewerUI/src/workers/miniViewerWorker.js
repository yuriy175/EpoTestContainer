import axios from 'axios';
import {HandlerWrapper} from './commonWorker'

const MiniViewerController = '/MiniViewer';
let MiniViewerServiceAddress = '';

export function SetMiniViewerServiceAddress(serviceAddress) {
    MiniViewerServiceAddress = serviceAddress;
}

export async function LoadImage(fileName) {
    return await HandlerWrapper('LoadImage', async () => {
        const response = await axios.get(MiniViewerServiceAddress + MiniViewerController + '/LoadImage?fileName=' + fileName);
        return response;
    });
};

export async function GetImageInfo(imageid) {
    return await HandlerWrapper('GetImageInfo', async () => {
        const response = await axios.get(MiniViewerServiceAddress + MiniViewerController + '/GetImageInfo');
        return response.data;
    });
};

export async function SetImageSize(desiredWidth, desiredHeight) {
    return await HandlerWrapper('SetImageSize', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/SetImageSize?desiredWidth=' + desiredWidth + '&desiredHeight=' + desiredHeight);
        return response.data;
    });
};

export async function SelectImage(imageId) {
    return await HandlerWrapper('SelectImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/SelectImage?imageId=' + imageId);
        return response.data;
    });
};

export async function HorFlipImage() {
    return await HandlerWrapper('HorFlipImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/HorFlipImage');
        return response.data;
    });
};

export async function VertFlipImage() {
    return await HandlerWrapper('VertFlipImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/VertFlipImage');
        return response.data;
    });
};

export async function RotateImage() {
    return await HandlerWrapper('RotateImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/RotateImage');
        return response.data;
    });
};

export async function InvertImage() {
    return await HandlerWrapper('InvertImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/InvertImage');
        return response.data;
    });
};

export async function UndoImage() {
    return await HandlerWrapper('UndoImage', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/UndoImageTransforms');
        return response.data;
    });
};

export async function SetFrameRate(frameRate) {
    return await HandlerWrapper('SetFrameRate', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/SetFrameRate?frameRate=' + frameRate);
        return response.data;
    });
};

export async function LoadPreviewOnly(previewSize, imagePath) {
    return await HandlerWrapper('LoadPreviewOnly', async () => {
        const response = await axios.get(MiniViewerServiceAddress + MiniViewerController + '/LoadPreviewOnly?imagePath=' + imagePath + '&previewSize=' + previewSize);
        return response.data;
    });
};

export async function GetDcmFiles(subDirPath) {
    return await HandlerWrapper('GetDcmFiles', async () => {
        const response = await axios.get(MiniViewerServiceAddress + MiniViewerController + '/GetDcmFiles?subDirPath=' + subDirPath);
        return response.data;
    });
};

export async function StartPlay() {
    return await HandlerWrapper('StartPlay', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayImage');
        return response.data;
    });
};

export async function StopPlay() {
    return await HandlerWrapper('StopPlay', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/StopPlaying');
        return response.data;
    });
};

export async function PlayFirst() {
    return await HandlerWrapper('PlayFirst', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayFirst');
        return response.data;
    });
};

export async function PlayPrev() {
    return await HandlerWrapper('PlayPrev', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayPrev');
        return response.data;
    });
};

export async function PlayNext() {
    return await HandlerWrapper('PlayNext', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayNext');
        return response.data;
    });
};

export async function PlayLast() {
    return await HandlerWrapper('PlayLast', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayLast');
        return response.data;
    });
};

export async function PlayExact(frameNumber) {
    return await HandlerWrapper('PlayExact', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/PlayExact?frameNumber=' + frameNumber);
        return response.data;
    });
};

export async function ScaleUp() {
    return await HandlerWrapper('ScaleUp', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/ScaleUp');
        return response.data;
    });
};

export async function ScaleDown() {
    return await HandlerWrapper('ScaleDown', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + '/ScaleDown');
        return response.data;
    });
};

export async function SetImageWindowLevel(centerUp = null, widthUp = null) {
    return await HandlerWrapper('SetImageWindowLevel', async () => {
        const response = await axios.post(MiniViewerServiceAddress + MiniViewerController + 
            '/SetImageWindowLevel?centerUp=' + (centerUp ?? '') + '&widthUp=' + (widthUp ?? ''));
        return response.data;
    });
};