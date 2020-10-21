import React from 'react';
import { Col, Input, Modal, Row, Tooltip, Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';


class AddVendorModal extends React.Component {


    render() {


        const { visible, confirm, submit, cancel, data } = this.props;
        console.log(data);
        return (
            <>
                <Modal
                    title="Add a Vendor"
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
                                placeholder="Enter Vendor Name"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                name="type"
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose a Type..."
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { this.props.changed({ target: { value: e, name: "category" } }) }}
                            >
                                <Option value="Manufacturer">Manufacturer</Option>
                                <Option value="Shipper">Shipper</Option>
                                <Option value="Dealer">Dealer</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                name="type"
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Set Status..."
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { this.props.changed({ target: { value: e, name: "status" } }) }}
                            >
                                <Option value="Active">Active</Option>
                                <Option style={{ background: 'red' }} value="Inactive">Inactive</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Input
                                onChange={this.props.changed}
                                type="text"
                                name="taxId"
                                value={data.name}
                                placeholder="Enter TAX ID"
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
                                name="contactName"
                                value={data.name}
                                placeholder="Enter contact person"
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
                                placeholder="email or phone"
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

export { AddVendorModal };