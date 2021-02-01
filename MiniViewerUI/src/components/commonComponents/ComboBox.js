import React from 'react';

export default function ComboBox(props) {
    return (
        <div className='combobox'>
            <label>{props.name}</label>
            <select name={props.name} onChange={ev => props.onSelect(this, ev)}>
                {props.items?.map((i, ind) => (
                    <option key={ind.toString()} value={i.val} selected={i.val === props.selectedIndex ? "selected" : ""}>
                        {i.name}
                    </option>
                ))
                }
            </select>
        </div>
    );
}