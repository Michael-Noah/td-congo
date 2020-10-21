import React from 'react';
import { Col } from 'antd';
import './BottomCalcBar.css';

const BottomCalcBar = props => {
    let { minmax, disabled = false, primary, title, value, span = 12, editable = false, type = "text", onChange = () => { }, icon = "" } = props;
    let barStyle = { background: primary ? "#dbdbdb" : "#f0f0f0", padding: '8px' }
    return (
        <>
            <Col span={span}>
                <div style={barStyle}>{title}</div>
            </Col>
            <Col span={span}>
                <div style={{ ...barStyle, textAlign: 'right' }}>{editable ?
                    <>
                        <input disabled={disabled} max={minmax?.max} min={minmax?.min} className="CalcBarInput" type={type} onChange={onChange} value={value} />
                        <div className="CalcBarIcon">{icon}</div>
                    </>
                    :
                    <>
                        {value}
                        <div className="CalcBarIcon">{icon}</div>
                    </>
                }</div>
            </Col>
        </>
    )
}

export default BottomCalcBar;