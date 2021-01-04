import React, { useState, useEffect, useRef, useContext } from 'react';

import { HardwareContext } from '../context/hardware-context';
import * as HardwareWorker from '../workers/hardwareWorker'
import { useChat } from '../chats/useChat'

import { AcquireChatName } from '../context/constants'
import { StateContext } from '../context/state-context';

import ListBox from './commonComponents/ListBox'
import DevicePanel from './hardwareComponents/DevicePanel'
import DialogButton from './dialogs/dialogComponents/DialogButton'

import AcquireChat from '../chats/acquireChat';

export default function HardwarePanel(props) {
    const [stateState] = useContext(StateContext);
    const [hardwareState, hardwareDispatch] = useContext(HardwareContext);
    const [currentAprs, setCurrentAprs] = useState([]);
    const [currentProjs, setCurrentProjs] = useState([]);
    const [currentProj, setCurrentProj] = useState('');
    const [currentApr, setCurrentApr] = useState('');
    const [currentDir, setCurrentDir] = useState('');
    const [currentWs, setCurrentWs] = useState('');
    const [shouldDefaultWs, setShouldDefaultWs] = useState(false);

    const [generatorState, setGeneratorState] = useState('');
    const [dosimeterState, setDosimeterState] = useState('');
    const [collimatorState, setCollimatorState] = useState('');
    const [detectorState, setDetectorState] = useState('');
    const [standState, setStandState] = useState('');
    const [ecpState, setEcpState] = useState('');

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
                }

                setCurrentWs(ws[0]?.id);
            }
        })();

    }, [hardwareState.workStations]);

    const OnRoi = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
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

        setCurrentAprs(aprs?.map(a => a.name) ?? []);
    }

    const OnApr = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
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

    const OnProj = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;

        setCurrentProj(val);
        setCurrentDir('');
        onGetApr();
    }

    const OnDir = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;

        setCurrentDir(val);
        onGetApr();
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

        setCurrentWs(val);
    }

    const onGetApr = async () => {
        if (currentApr && currentProj && currentWs) {
            await HardwareWorker.GetOrganAutos(currentApr, currentProj, currentDir, currentWs);
        }
    }

    const projNames = [...new Set(currentProjs?.map(p => p.projection?.value))];
    const dirNames = [...new Set(currentProjs?.filter(p => p.projection?.value === currentProj).map(p => p.direction?.value))];

    const onGeneratorChanged = async (info) => {
        setGeneratorState(info);
    }

    const onDetectorChanged = async (info) => {
        setDetectorState(info);
    }

    const onStandChanged = async (info) => {
        setStandState(info);
    }

    const onEcpChanged = async (info) => {
        setEcpState(info);
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
                })} onSelect={OnRoi}></ListBox>
                <ListBox name='Organ autos' items={currentAprs?.map(a => {
                    return { name: a, val: a };
                })} onSelect={OnApr}></ListBox>
                <ListBox name='Projections' items={projNames?.map(p => {
                    return { name: p, val: p };
                })} onSelect={OnProj}></ListBox>
                <ListBox name='Directions' items={dirNames?.map(p => {
                    return { name: p, val: p };
                })} onSelect={OnDir}></ListBox>
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
            <div id="exposurePanel" className={props.className}>
            </div>
        </div>
    );
}