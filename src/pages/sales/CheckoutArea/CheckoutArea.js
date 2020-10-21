import React from 'react';
import Box from '@iso/components/utility/box';
import ContentHolder from '@iso/components/utility/contentHolder';
import { Button, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Table from '@iso/components/uielements/table';
import Input from '@iso/components/uielements/input';
import BottomCalcBar from '../../../components/BottomCalcBar/BottomCalcBar';
import { Col, Row } from 'antd';
import _ from 'lodash';
import './CheckoutArea.css';



const getCustomerKey = (customerObject, searchString) => {

    return Object.keys(customerObject).filter(objectKey => {
        return customerObject[objectKey].name === searchString;
    })
}


class CheckoutArea extends React.Component {

    shouldComponentUpdate(prevProps) {
        if (_.isEqual(prevProps.rawData, this.props.rawData)
            && _.isEqual(prevProps.tax, this.props.tax)
            && _.isEqual(prevProps.labor, this.props.labor)
            && _.isEqual(prevProps.discount, this.props.discount)
            && _.isEqual(prevProps.recipient, this.props.recipient)
            && _.isEqual(prevProps.selectedCustomer, this.props.selectedCustomer)) {
            return false;
        }
        return true;
    }

    render() {
        var subtotal = 0, discount = this.props.discount ? +this.props.discount : 0, tax = this.props.tax ? +this.props.tax : 0, labor = this.props.labor ? +this.props.labor : 0;

        (this.props.dataSource).forEach((item) => {
            subtotal += parseFloat(item.ttlPrice);
        })
        var total = parseFloat((subtotal + labor - discount + (subtotal * (tax / 100))).toFixed(2));

        let customers = this.props.customers && Object.keys(this.props.customers).map(customer => {
            return <Select.Option key={customer} value={this.props.customers[customer].name}>{this.props.customers[customer].name}</Select.Option>
        });

        // this.props.customers && customers.push(<Option key="empty" value="">_</Option>);

        let inputElement = null;


        let prepareSubmit = (evt) => {
            evt.preventDefault();
            let data = {
                tax,
                subtotal,
                discount,
                grandtotal: total,
                labor,
                customer: getCustomerKey(this.props.customers, this.props.selectedCustomer)[0],
            };

            this.props.submit(evt, data);
        }


        return (
            <Box>
                <form onSubmit={prepareSubmit}>
                    <Row justify="space-between">
                        <Col lg={10} md={10} sm={10} xs={11}>
                            <ContentHolder>
                                <Input value={this.props.recipient} required onChange={this.props.recipientChanged} placeholder="Recipient" />
                            </ContentHolder>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={11}>
                            <ContentHolder>
                                <Select
                                    name="Customer"
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Choose a Customer"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={this.props.customerChanged}
                                >
                                    {customers}
                                </Select>
                            </ContentHolder>
                        </Col>
                    </Row>
                    <br />
                    <div style={this.props.TableStyle} className={this.props.glow ? 'GlowingClass' : ''} onDrop={this.props.drop} onDragEnter={this.props.dragEnter} onDragOver={this.props.dragOver}>
                        <Table
                            size="small"
                            expandable={{
                                expandedRowRender: record => <div style={{ margin: 0 }}>{record.description}</div>,
                                rowExpandable: record => record.name !== 'Not Expandable',
                            }}
                            pagination={false}
                            dataSource={this.props.dataSource}
                            columns={this.props.columns} />
                    </div>
                    <br />
                    <Row>
                        <BottomCalcBar title={'Subtotal:'} value={subtotal} icon="USD" primary />
                        <BottomCalcBar title={'Labor:'} minmax={this.props.laborConfig} disabled={this.props.noLabor} value={labor} type="number" editable icon="USD" onChange={this.props.onChangeLabor} />
                        <BottomCalcBar title={'Discount:'} minmax={this.props.discountConfig} disabled={this.props.noDiscount} value={discount} type="number" editable icon="USD" primary onChange={this.props.onChangeDiscount} />
                        <BottomCalcBar title={'Tax:'} minmax={this.props.taxConfig} disabled={this.props.noTax} value={tax} type="number" editable icon="%" onChange={this.props.onChangeTax} />
                        <BottomCalcBar title={'Total:'} value={total} icon="USD" primary />
                    </Row>
                    <Row justify="space-between">
                        <Col lg={10} md={10} sm={10} xs={11}>
                            <ContentHolder>
                                <Button block size="large"
                                    type="default"
                                    icon={<CloseOutlined />}
                                    loading={false}
                                    disabled={this.props.disableCancel}
                                    onClick={this.props.cancel}>
                                    Cancel
                            </Button>
                            </ContentHolder>
                        </Col>
                        <Col lg={10} md={10} sm={10} xs={11}>
                            <ContentHolder>
                                <Button block size="large"
                                    className="btn-success"
                                    icon={<CheckOutlined />}
                                    loading={this.props.loading}
                                    disabled={this.props.disableCancel}
                                    onClick={() => inputElement.click()}
                                    type="submit">
                                    Continue
                            </Button>
                            </ContentHolder>
                        </Col>
                    </Row>
                    <button ref={input => inputElement = input} hidden type="submit"></button>
                </form>
            </Box>
        )
    }
}

export default React.memo(CheckoutArea);