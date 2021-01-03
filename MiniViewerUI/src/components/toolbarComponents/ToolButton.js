import React from 'react';

export default function ToolButton(props) {
    return (
        <div className={'toolButton ' + props.btnClass} id={props.svgClass + 'Id'} onClick={ev => props.onClick(ev)} title={props.title}>
            <svg className={props.svgClass} />
        </div>
    );
}