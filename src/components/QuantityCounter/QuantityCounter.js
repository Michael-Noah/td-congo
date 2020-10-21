import React from 'react';
import './QuantityCounter.css';

const QuantityCounter = props => {
    return (
        <div className="quantity">
            <button type="button" onClick={props.decrement} className="quantity__minus">
                <span>-</span>
            </button>
            <input className="quantity__input" type="number" min={1} max={props.maxValue} value={props.value? props.value: 1} onChange={props.changeInput} />
            <button type="button" onClick={props.increment} className="quantity__plus">
                <span>+</span>
            </button>
        </div>
    )
}

export default QuantityCounter;