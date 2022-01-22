import React from 'react';
import { useBarcode } from 'react-barcodes';

export default function Barcode(props) {
    const { value } = props

    const { inputRef } = useBarcode({
        value: value,
        options: {
            displayValue: false,
        }
    });

    return <canvas class="swiper-barcode" ref={inputRef} />;
};
