import React from 'react';
import { Col, Divider, Input, Modal, Row, Select, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';


class EditInventoryModal extends React.Component {



    render() {
        const { visible, confirm, submit, cancel } = this.props;
        return (
            <>
                <Modal
                    title="Edit Product"
                    visible={visible}
                    onOk={submit}
                    confirm={confirm}
                    onCancel={cancel}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                type="text"
                                style={{ marginBottom: "1rem" }}
                                placeholder="Edit Product Name"
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
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Change Category"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { console.log(e) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Change Location"
                                defaultValue="jack"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { console.log(e) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Change Supplier"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { console.log(e) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider>Properties...</Divider>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                type="number"
                                min={0}
                                style={{ marginBottom: "1rem" }}
                                placeholder="Buying Price"
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
                                type="number"
                                min={0}
                                style={{ marginBottom: "1rem" }}
                                placeholder="Selling Price"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Input
                                type="number"
                                min={0}
                                style={{ marginBottom: "1rem" }}
                                placeholder="Stock"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Input
                                type="text"
                                style={{ marginBottom: "1rem" }}
                                placeholder="Unit"
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
                                type="text"
                                style={{ marginBottom: "1rem" }}
                                placeholder="Set Part Number"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                    </Row>
                    <Divider>Extra...</Divider>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                type="text"
                                placeholder="Set Product Property"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Input type="file" />
                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

export { EditInventoryModal };