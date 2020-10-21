import React from 'react';
import { Button, Col, Divider, Input, Modal, Row, Select, Tooltip, Upload } from 'antd';
import { InfoCircleOutlined, UserOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';


class AddInventoryModal extends React.Component {


    render() {

        // let fileList = this.props.data.img;

        // const uploadProps = {
        //     onRemove: file => {
        //         this.props.changed(file);
        //     },
        //     beforeUpload: file => {
        //         this.props.changed(file);
        //         return false;
        //     },
        //     fileList,
        // };




        const { visible, confirm, submit, cancel, data } = this.props;
        console.log(data);
        return (
            <>
                <Modal
                    title="Add Product to Inventory"
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
                                placeholder="Enter Product Name"
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
                                name="category"
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose a Category"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { this.props.changed({ target: { value: e, name: "category" } }) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                showSearch
                                name="location"
                                style={{ width: '100%' }}
                                placeholder="Choose Location"
                                defaultValue="jack"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { this.props.changed({ target: { value: e, name: "location" } }) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Select
                                showSearch
                                name="vendor"
                                style={{ width: '100%' }}
                                placeholder="Choose Vendor"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(e) => { this.props.changed({ target: { value: e, name: "vendor" } }) }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider>Properties</Divider>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                onChange={this.props.changed}
                                type="number"
                                name="buyPrice"
                                value={data.buyPrice}
                                min={0}
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
                                onChange={this.props.changed}
                                type="number"
                                name="cost"
                                value={data.cost}
                                min={0}
                                placeholder="Selling Price"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={7}>
                            <Input
                                onChange={this.props.changed}
                                type="number"
                                name="availableStore"
                                value={data.availableStore}
                                min={0}
                                placeholder="Stock"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <Input
                                onChange={this.props.changed}
                                type="text"
                                name="unit"
                                value={data.unit}
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
                                onChange={this.props.changed}
                                type="text"
                                name="partNum"
                                value={data.partNum}
                                placeholder="Part Number"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                    </Row>
                    <Divider>Extra</Divider>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Input
                                onChange={this.props.changed}
                                type="text"
                                name="code"
                                value={data.code}
                                placeholder="Product Property"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={12} >
                            <Upload accept=".jpg,.png" showUploadList={false} onRemove={(e) => { this.props.changed({ target: { value: e, name: 'img' } }) }} beforeUpload={(e) => { this.props.changed({ target: { value: e, name: 'img' } }) }}>
                                <Button icon={<UploadOutlined />} style={{ width: '12vw', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {data.img ? data.img.name : 'Select Product Picture'}
                                </Button>{data.img &&
                                    <span style={{ position: 'absolute', right: '2%', top: '30%' }}>
                                        <MinusCircleOutlined onClick={() => { this.props.changed({ target: { value: "", name: 'img' } }) }} />
                                    </span>}
                            </Upload>

                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

export { AddInventoryModal };