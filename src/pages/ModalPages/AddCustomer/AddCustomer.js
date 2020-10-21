import React from 'react';
import { Col, Input, Modal, Row, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

class AddCustomerModal extends React.Component {


    render() {


        const { visible, confirm, submit, cancel, data } = this.props;
        console.log(data);
        return (
            <>
                <Modal
                    title="Add a Customer"
                    visible={visible}
                    onOk={submit}
                    confirm={confirm}
                    onCancel={cancel}
                >
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                onChange={this.props.changed}
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="Enter Customer Name"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Input
                                onChange={this.props.changed}
                                type="text"
                                name="contact"
                                value={data.name}
                                placeholder="Enter Customer Contact"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

export { AddCustomerModal };