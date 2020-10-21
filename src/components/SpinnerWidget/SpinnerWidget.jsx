import { Space, Spin } from 'antd';
import React from 'react';
import './SpinnerWidget.css';

const AppSpinner = props => {
    return (
        <div className={props.class? props.class : 'SpinnerDiv'}>
            <Space size={!props.SpaceSize ? "large" : props.SpaceSize}>
                <Spin size={!props.size ? "large" : props.size} />
            </Space>
        </div>
    )
}

export default AppSpinner;