import React from 'react';

export default function ListBox(props) {
    return (
        <div className='listbox'>
            <label>{props.name}</label>
            <select name={props.name} size="20" onChange={ev => props.onSelect(this, ev)}>
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