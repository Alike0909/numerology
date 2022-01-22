import React, { useEffect, useState } from 'react';
import './index.css'

export default function FeatureDetails(props) {

    // PROPS 

    const { OPV } = props
    const { TP } = props

    // PROPS ENDS

    const displayFeatureDetails = (opv, tp) => {
        if (opv) {
            const title = opv[Number(props.match.params.id) - 1]?.title
            const desc_1 = opv[Number(props.match.params.id) - 1]?.desc
            return (
                <>
                    <h1>{title}</h1>
                    <p>{desc_1}</p>
                </>
            )
        } else if (tp) {
            const title = tp[Number(props.match.params.id) - 1]?.title
            const desc_1 = tp[Number(props.match.params.id) - 1]?.talent
            const desc_2 = tp[Number(props.match.params.id) - 1]?.event
            return (
                <>
                    <h1>{title}</h1>
                    <b>Талант: </b><p> {desc_1}</p>
                    <b>События: </b><p>{desc_2}</p>
                </>
            )
        }
    }   

    return (
        <div className="feature-details" style={{ padding: '48px 24px 0 24px' }}>
            {displayFeatureDetails(OPV, TP)}
        </div>
    )
}