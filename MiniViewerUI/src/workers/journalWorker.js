import axios from 'axios';
import {HandlerWrapper, GetJsonHeader} from './commonWorker'

const JournalController = '/Journal';
let JournalServiceAddress = '';

export function SetJournalServiceAddress(serviceAddress) {
    JournalServiceAddress = serviceAddress;
}

export async function GetStudyList(filter) {
    return await HandlerWrapper('StudyList', async () => {
        const response = await axios.post(JournalServiceAddress + JournalController +
            '/StudyList',
            JSON.stringify(filter),
            GetJsonHeader());
        return response.data;
    });
};

export async function AddStudy(study) {
    return await HandlerWrapper('AddStudy', async () => {
        const response = await axios.post(JournalServiceAddress + JournalController +
            '/AddStudy',
            JSON.stringify(study),
            GetJsonHeader());
        return response.data;
    });
};

export async function AddPatient(patient) {
    return await HandlerWrapper('AddPatient', async () => {
        const response = await axios.post(JournalServiceAddress + JournalController +
            '/AddPatient',
            JSON.stringify(patient),
            GetJsonHeader());
        return response.data;
    });
};

export async function GetStudy(id) {
    return await HandlerWrapper('GetStudy', async () => {
        const response = await axios.get(JournalServiceAddress + JournalController +
            '/GetStudy?id=' + id);
        return response.data;
    });
};
