import React, { useState, useEffect, useRef, useContext } from 'react';

import { HardwareContext } from '../context/hardware-context';
import * as HardwareWorker from '../workers/hardwareWorker'
import { useChat } from '../chats/useChat'

import { AcquireChatName } from '../context/constants'
import { StateContext } from '../context/state-context';
import { JournalContext } from '../context/journal-context';

import ListBox from './commonComponents/ListBox'
import DevicePanel from './hardwareComponents/DevicePanel'
import ExposurePanel from './hardwareComponents/ExposurePanel'
import DialogButton from './dialogs/dialogComponents/DialogButton'

import AcquireChat from '../chats/acquireChat';

export default function HardwarePanel(props) {
    const defaultWorkStation = 1;
    const defaultAgeGroup = 6;

    const [stateState] = useContext(StateContext);
    const [hardwareState, hardwareDispatch] = useContext(HardwareContext);
    const [journalState, journalDispatch] = useContext(JournalContext);
    const [currentAprs, setCurrentAprs] = useState([]);
    const [currentProjs, setCurrentProjs] = useState([]);
    const [currentRoi, setCurrentRoi] = useState('');
    const [currentProj, setCurrentProj] = useState('');
    const [currentApr, setCurrentApr] = useState('');
    const [currentDir, setCurrentDir] = useState('');
    const [currentWs, setCurrentWs] = useState('');
    const [shouldDefaultWs, setShouldDefaultWs] = useState(false);

    const [generatorState, setGeneratorState] = useState('');
    const [dosimeterState, setDosimeterState] = useState('');
    const [collimatorState, setCollimatorState] = useState('');
    const [detectorState, setDetectorState] = useState({});
    const [standState, setStandState] = useState('');
    const [ecpState, setEcpState] = useState({});

    console.log('! render HardwarePanel');

    useEffect(() => {
        (async () => {
            if (hardwareState.rois.length === 0) {
                const rois = await HardwareWorker.LoadRois();
                if (rois) {
                    hardwareDispatch({ type: 'SETROIS', payload: rois });
                }

                await onGetGeneratorState();
                await onGetStandState();
                await onGetDosimeterState();
            }
        })();

    }, [hardwareState.rois]);

    useEffect(() => {
        (async () => {
            if (hardwareState.workStations.length === 0) {
                const ws = await HardwareWorker.GetLogicalWorkstations();
                if (ws) {
                    hardwareDispatch({ type: 'SETWS', payload: ws.filter(w => w.isVisible) });
                    setCurrentWs(ws[0]?.id);
                }
            }
        })();

    }, [hardwareState.workStations]);

    useEffect(() => {
        (async () => {
            if (journalState.studyInWork?.id) {
                const studyName = journalState.studyInWork.name;
                const apr = await HardwareWorker.GetDefaultOrganAuto(
                    currentWs ?? defaultWorkStation,
                    defaultAgeGroup,
                    studyName);

                const roi = hardwareState.rois.filter(r => r.name === apr.roi)[0];
                if (roi) {
                    await LoadAprs(roi.id);
                }

                if (studyName) {
                    await LoadProjs(studyName);
                }
            }
        })();

    }, [journalState.studyInWork]);

    const LoadAprs = async (val) => {
        let aprs = hardwareState.aprs.filter(a => a.roi === val);
        if (!aprs || aprs.length === 0) {
            aprs = await HardwareWorker.LoadOrganAutosByRoiId(val);
            if (aprs) {
                hardwareDispatch({ type: 'SETAPRS', payload: { roi: val, aprs: aprs } });
            }
        }
        else {
            aprs = aprs[0].aprs;
        }

        setCurrentRoi(val);
        setCurrentAprs(aprs?.map(a => a.name) ?? []);
        setCurrentProjs([]);
        setCurrentProj('');
        setCurrentDir('');
    }

    const OnRoi = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
        await LoadAprs(val);
    }

    const LoadProjs = async (val) => {
        let projs = hardwareState.projs.filter(a => a.apr === val);
        if (!projs || projs.length === 0) {
            projs = await HardwareWorker.LoadProjectionsByOrganAutoName(val);
            if (projs) {
                hardwareDispatch({ type: 'SETPROJS', payload: { apr: val, projs: projs } });
            }
        }
        else {
            projs = projs[0].projs;
        }

        setCurrentApr(val);
        setCurrentProjs(projs ?? []);
        setCurrentProj('');
        setCurrentDir('');
    }

    const OnApr = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
        await LoadProjs(val);
    }

    const OnProj = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;

        setCurrentProj(val);

        var dirs = currentProjs.filter(p => p.projection.value === val)?.map(p => p.direction.value);
        const dir = dirs.length === 0 ? '' : dirs[0];
        setCurrentDir(dir);
        onGetApr(currentApr, val, dir, currentWs);
    }

    const OnDir = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;

        setCurrentDir(val);
        onGetApr(currentApr, currentProj, val, currentWs);
    }

    const OnWs = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;

        if (shouldDefaultWs) {
            await HardwareWorker.GetDefaultOrganAuto(val);
        }
        else {
            await HardwareWorker.ChangeLogicalWorkStation(val);
        }

        setCurrentWs(currentApr, currentProj, currentDir, val);
    }

    const onGetApr = async (apr, proj, dir, ws) => {
        if (apr && proj && ws) {
            await HardwareWorker.GetOrganAutos(apr, proj, dir, ws);
        }
    }

    const projNames = [...new Set(currentProjs?.map(p => p.projection?.value))];
    const dirNames = [...new Set(currentProjs?.filter(p => p.projection?.value === currentProj).map(p => p.direction?.value))];

    const onGeneratorChanged = async (info) => {
        setGeneratorState(info);
    }

    const onDetectorChanged = async (info) => {
        setDetectorState({
            ...detectorState,
            detectorField: info.detectorField ?? detectorState.detectorField,
        });
    }

    const onStandChanged = async (info) => {
        setStandState(info);
    }

    const onEcpChanged = async (info) => {
        setEcpState({
            ...ecpState,
            projection: info.projection ?? ecpState.projection,
            direction: info.direction ?? ecpState.direction,
            position_Select: info.position_Select?.opted ?? ecpState.position_Select,
        });
        info.projection && setCurrentProj(info.projection);
        info.direction && setCurrentDir(info.direction);
        if (info.position_Select) {
            await HardwareWorker.SetStandPosition(info.position_Select.opted);
        }
    }

    const onCollimatorChanged = async (info) => {
        setCollimatorState(info);
    }

    const onGetGeneratorState = async () => {
        const info = await HardwareWorker.RequestGeneratorState();
        setGeneratorState(info);
    }

    const onGetStandState = async () => {
        const info = await HardwareWorker.RequestStandState();
        setStandState(info);
    }

    const onGetDosimeterState = async () => {
        const info = await HardwareWorker.RequestDosimeterState();
        setDosimeterState(info);
    }

    return (
        <div id="hardwarePanel" className={props.className}>
            <div id="aprPanel" className={props.className}>
                <ListBox name='ROI' items={hardwareState.rois?.map(r => {
                    return { name: r.name, val: r.id };
                })} onSelect={OnRoi} selectedIndex={currentRoi}></ListBox>
                <ListBox name='Organ autos' items={currentAprs?.map(a => {
                    return { name: a, val: a };
                })} onSelect={OnApr} selectedIndex={currentApr}></ListBox>
                <ListBox name='Projections' items={projNames?.map(p => {
                    return { name: p, val: p };
                })} onSelect={OnProj} selectedIndex={currentProj}></ListBox>
                <ListBox name='Directions' items={dirNames?.map(p => {
                    return { name: p, val: p };
                })} onSelect={OnDir} selectedIndex={currentDir}></ListBox>
                {/* <DialogButton caption="Set Apr" onClick={onGetApr} /> */}
                <ListBox name='Workstations' items={hardwareState.workStations?.map(w => {
                    return { name: w.uniqueName, val: w.id };
                })} onSelect={OnWs} selectedIndex={currentWs}></ListBox>
            </div>
            <div id="deviceResponsePanel" className={props.className}>
                <AcquireChat onGeneratorChanged={onGeneratorChanged}
                    onDetectorChanged={onDetectorChanged}
                    onStandChanged={onStandChanged}
                    onCollimatorChanged={onCollimatorChanged}
                    onEcpChanged={onEcpChanged}>
                </AcquireChat>
                <DevicePanel name='Generator' info={generatorState} onGetState={onGetGeneratorState}></DevicePanel>
                <DevicePanel name='Dosimeter' info={dosimeterState} onGetState={onGetDosimeterState}></DevicePanel>
                <DevicePanel name='Collimator' info={collimatorState}></DevicePanel>
                <DevicePanel name='Detector' info={detectorState}></DevicePanel>
                <DevicePanel name='Stand' info={standState} onGetState={onGetStandState}></DevicePanel>
                <DevicePanel name='Ecp' info={ecpState}></DevicePanel>
            </div>
            <ExposurePanel detectorField={detectorState.detectorField} standPosition={ecpState.position_Select}/>
        </div>
    );
}