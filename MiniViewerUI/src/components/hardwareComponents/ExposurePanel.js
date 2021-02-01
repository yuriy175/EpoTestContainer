import React, { useState, useEffect, useRef, useContext } from 'react';

import CommonButton from '../commonComponents/CommonButton'
import ComboBox from '../commonComponents/ComboBox'
import * as HardwareWorker from '../../workers/hardwareWorker'

export default function ExposurePanel(props) {
    console.log(`! render ExposurePanel ${props.name}`);

    const [collFilters, setCollFilters] = useState([]);
    const [detectorFields, setDetectorFields] = useState([]);
    const [currentCollFilter, setCurrentCollFilter] = useState('');
    const [currentDetectorField, setCurrentDetectorField] = useState('');

    const [standPositions] = useState([
        { index: 1, name: 'table_horizontal' },
        { index: 2, name: 'table_vertical' },
    ]);

    const [currentStandPosition, setStandPosition] = useState(standPositions[0].name);

    useEffect(() => {
        (async () => {
            const filters = await HardwareWorker.GetCollimatorFilters();
            if (filters) {
                setCollFilters(filters);
                setCurrentCollFilter(filters[0].presentation)
            }
            const fields = await HardwareWorker.GetDetectorFields();
            if (fields) {
                setDetectorFields(fields);
                setCurrentDetectorField(fields[0]);
            }
        })();
    }, []);

    const onUnblock = async () => {
        const result = await HardwareWorker.UnBlockHigh(true);
    }

    const onMakeShot = async () => {
        const result = await HardwareWorker.MakeShot();
    }

    const onMakeSeries = async () => {
        const result = await HardwareWorker.MakeSeries();
    }

    const OnCollFilter = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
        //await LoadAprs(val);
    }

    const OnDetectorField = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
        //await LoadAprs(val);
    }

    const OnStandPosition = async (elem, ev) => {
        const select = ev.target;
        const val = select.options[select.selectedIndex].value;
        //await LoadAprs(val);
    }

    return (
        <div id='exposurePanel'>
            <ComboBox name='Collimator Filters' items={collFilters?.map(r => {
                return { name: r.presentation, val: r.index };
            })} onSelect={OnCollFilter} selectedIndex={currentCollFilter}></ComboBox>

            <ComboBox name='Detector Fields' items={detectorFields?.map(r => {
                return { name: r.name, val: r.id };
            })} onSelect={OnDetectorField} selectedIndex={currentDetectorField}></ComboBox>

            <ComboBox name='Stand Positions' items={standPositions?.map(r => {
                return { name: r.name, val: r.index };
            })} onSelect={OnStandPosition} selectedIndex={currentStandPosition}></ComboBox>

            <CommonButton caption="Make Shot" onClick={onMakeShot} />
            <CommonButton caption="Make Series" onClick={onMakeSeries} />
            <CommonButton caption="Unblock" onClick={onUnblock} />
        </div>
    );
};
