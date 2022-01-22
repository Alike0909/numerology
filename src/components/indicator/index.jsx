import React, { useEffect, useState } from 'react';
import './index.css'

export default function CustomIndicator(props) {

    // PROPS 
    let { value } = props
    const { isGood } = props

    // PROPS ENDS

    if (value == undefined) {
        value = 10
    }

    return (
        <div className="indicator" style={isGood ? { borderColor: '#adff2f', background: '#adff2f' } : { borderColor: '#e34234', background: '#e34234' }}>
            <div className="indicator-value" style={{width: '2px', height: `${100 - value}%`, background: 'black'}}></div>
        </div>
    )
}