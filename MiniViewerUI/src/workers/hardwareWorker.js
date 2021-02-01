import axios from 'axios';
import { HandlerWrapper } from './commonWorker'

const ExpositionController = '/Exposition';
const OrganAutoController = '/OrganAutoManipulation';
const DetectorsController = '/Detectors';
let HardwareServiceAddress = '';

export function SetHardwareServiceAddress(serviceAddress) {
    HardwareServiceAddress = serviceAddress;
}

export async function LoadRois() {
    return await HandlerWrapper('LoadRois', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/LoadRois');
        return response.data;
    });
};

export async function LoadOrganAutosByRoiId(roiId) {
    return await HandlerWrapper('LoadOrganAutosByRoiId', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/LoadOrganAutosByRoiId?roiId=' + roiId);
        return response.data;
    });
};

export async function LoadProjectionsByOrganAutoName(oaName) {
    return await HandlerWrapper('LoadProjectionsByOrganAutoName', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/LoadProjectionsByOrganAutoName?oaName=' + oaName);
        return response.data;
    });
};

export async function GetLogicalWorkstations() {
    return await HandlerWrapper('GetLogicalWorkstations', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/GetLogicalWorkstations');
        return response.data;
    });
};

export async function GetDefaultOrganAuto(logicalWsId, ageId = null, organAutoName = null) {
    return await HandlerWrapper('GetDefaultOrganAuto', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/GetDefaultOrganAuto?logicalWsId=' + logicalWsId
            + '&ageId=' + (ageId ?? '')
            + '&organAutoName=' + (organAutoName ?? ''));
        return response.data;
    });
};

//GetOrganAutosAsync(string organAutoName, string projection, string direction, string laterality, int logicalWsId, int ageId, int constitution, bool isOriginal, [FromBody] ShootingModes[] shootingModes)
export async function GetOrganAutos(organAutoName, projection, direction, logicalWsId, laterality = 'U', ageId = 6, constitution = 2, isOriginal = true, shootingModes = [1, 4]) {
    return await HandlerWrapper('GetOrganAutos', async () => {
        const response = await axios.post(HardwareServiceAddress + OrganAutoController +
            '/GetOrganAutos?organAutoName=' + organAutoName
            + '&projection=' + projection
            + '&direction=' + direction
            + '&laterality=' + laterality
            + '&logicalWsId=' + logicalWsId
            + '&ageId=' + ageId
            + '&constitution=' + constitution
            + '&isOriginal=' + isOriginal,
            JSON.stringify(shootingModes),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        return response.data;
    });
};

export async function ChangeLogicalWorkStation(value) {
    return await HandlerWrapper('ChangeLogicalWorkStation', async () => {
        const response = await axios.post(HardwareServiceAddress + OrganAutoController +
            '/ChangeLogicalWorkStation?value=' + value);
        return response.data;
    });
};

export async function RequestStandState() {
    return await HandlerWrapper('RequestStandState', async () => {
        const response = await axios.get(HardwareServiceAddress + ExpositionController +
            '/RequestStandState');
        return response.data;
    });
};

export async function RequestGeneratorState() {
    return await HandlerWrapper('RequestGeneratorState', async () => {
        const response = await axios.get(HardwareServiceAddress + ExpositionController +
            '/RequestGeneratorState');
        return response.data;
    });
};

export async function RequestDosimeterState() {
    return await HandlerWrapper('RequestDosimeterState', async () => {
        const response = await axios.get(HardwareServiceAddress + ExpositionController +
            '/RequestDosimeterState');
        return response.data;
    });
};

export async function StudyInWork(studyId) {
    return await HandlerWrapper('StudyInWork', async () => {
        const response = await axios.get(HardwareServiceAddress + DetectorsController +
            '/StudyInWork?studyId=' + studyId);
        return response.data;
    });
};

export async function UnBlockHigh(unBlocked) {
    return await HandlerWrapper('UnBlockHigh', async () => {
        const response = await axios.post(HardwareServiceAddress + DetectorsController +
            '/UnBlockHigh?unBlocked=' + unBlocked);
        return response.data;
    });
};

export async function GetExaminationNames() {
    return await HandlerWrapper('GetExaminationNames', async () => {
        const response = await axios.get(HardwareServiceAddress + OrganAutoController +
            '/GetExaminationNames');
        return response.data;
    });
};


export async function MakeSeries() {
    return await HandlerWrapper('MakeSeries', async () => {
        const response = await axios.post(HardwareServiceAddress + DetectorsController +
            '/MakeSeries');
        return response.data;
    });
};

export async function MakeShot() {
    return await HandlerWrapper('MakeShot', async () => {
        const response = await axios.post(HardwareServiceAddress + DetectorsController +
            '/MakeShot');
        return response.data;
    });
};

export async function GetCollimatorFilters() {
    return await HandlerWrapper('GetCollimatorFilters', async () => {
        const response = await axios.get(HardwareServiceAddress + ExpositionController +
            '/GetCollimatorFilters');
        return response.data;
    });
};

export async function GetDetectorFields() {
    return await HandlerWrapper('GetDetectorFields', async () => {
        const response = await axios.get(HardwareServiceAddress + DetectorsController +
            '/GetDetectorFields');
        return response.data;
    });
};