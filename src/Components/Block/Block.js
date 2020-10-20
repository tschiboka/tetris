import React from 'react';
import "./Block.scss";



export default function Block(props) {
    return (
        <div className={`Block type_${props.type}`}><div></div></div>
    );
}