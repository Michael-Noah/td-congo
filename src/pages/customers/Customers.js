import React, { Component } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import * as customersActions from '@iso/redux/customers/actionCreators';
import { connect } from 'react-redux';
import { Button, Col, Input, Popconfirm, Row, Space, Table } from 'antd';
import { itemExistsInAny } from '@iso/lib/helpers/ItemSearchString';
import Box from '@iso/components/utility/box';
import { AddCustomerModal } from '../ModalPages/AddCustomer/AddCustomer';

const styles = {
    PageStyle: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    tabsStyle: {
        height: '70vh', overflowY: 'scroll', overflow: 'auto'
    },

    outTableStyle: {
        overflowY: 'scroll', overflow: 'auto', height: "35vh"
    },
};





class Customers extends Component {

    state = {
        searchQuery: "",
        filteredInfo: null,
        sortedInfo: null,
        addCustomerData: {
            name: "", contact: "",
        },
        editCustomerData: {
            name: "", contact: "",
        },
        addModal: false,
        editModal: false,
    }


    toggleAddModal = () => {
        this.setState((prevState) => ({
            addModal: !prevState.addModal
        }));
    }

    submitCustomerData = () => {
        this.toggleAddModal();

    }

    handleTableChanges = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    addCustomerDataChanged = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState((prevState) => ({
            addCustomerData: {
                ...prevState.addCustomerData,
                [name]: value,
            }
        }));
    }


    componentDidMount() {
        let { dispatch } = this.props;
        !this.props.customerList && dispatch(customersActions.getCustomers());
    }





    render() {

        const columns = [
            {
                title: 'NAME',
                dataIndex: 'name',
                key: 'name',
                width: '15%',
                ellipsis: true,
                sorter: (a, b) => a.name.localeCompare(b.name, { ignorePunctuation: true, sensitivity: 'base' }),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'ATTACHMENT',
                dataIndex: 'attachment',
                key: 'attachment',
                ellipsis: true,
                sorter: (a, b) => a.attachment.localeCompare(b.attachment, { ignorePunctuation: true, sensitivity: 'base' }),
            },
            {
                title: 'CONTACT',
                dataIndex: 'contact',
                key: 'contact',
                width: '12%',
                sorter: (a, b) => a.contact.localeCompare(b.contact, { ignorePunctuation: true, sensitivity: 'base' }),
                render: (contact) => contact ? contact : 'NONE SET'
            },
            {
                title: 'ENTRY DATE',
                dataIndex: 'date',
                key: 'epoch',
                sorter: (a, b) => a.epoch - b.epoch,
            },
            {
                title: 'ACTION',
                dataIndex: 'action',
                key: 'action',
                width: '15%',
                render: (action) => {
                    return (<Popconfirm title={`Confirm ${action}?`} onConfirm={() => { }}>
                        <Button type="primary" danger>{action}</Button>
                    </Popconfirm>
                    )
                }
            },
        ];

        let customerItems = [];
        if (this.props.customerList) {
            Object.keys(this.props.customerList).map((customer) => {
                let dateConfig = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                let customerItem = this.props.customerList[customer];
                let customerSearchParams = [(customerItem.name).trim(), (customerItem.contact).trim()];
                if (itemExistsInAny(customerSearchParams, this.state.searchQuery)) {
                    customerItems.push({
                        key: customer,
                        name: (customerItem.name).trim(),
                        attachment: customerItem.location,
                        contact: customerItem.contact,
                        date: new Date(customerItem.time).toLocaleString([], dateConfig),
                        epoch: customerItem.time,
                        action: "Delete",
                    })
                };
                return null;
            })
        }
        return (
            <>
            <AddCustomerModal 
            visible={this.state.addModal} 
            data={this.state.addCustomerData} 
            changed={this.addCustomerDataChanged}
            confirm={this.submitCustomerData}
            cancel={this.toggleAddModal}/>
                <LayoutContentWrapper style={styles.PageStyle}>
                    <Row style={basicStyle.rowStyle}>
                        <Col lg={24} style={basicStyle.colStyle}>
                            <Box title="Customers">
                                <Space style={{ marginBottom: 16 }}>
                                    <Button onClick={this.toggleAddModal} className="btn-success" block size="large">ADD CUSTOMER</Button>
                                </Space>
                                <Input size="large" type="search" placeholder="search" value={this.state.searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }) }} />
                                <Table loading={!this.props.customerList} size="small" pagination={true} dataSource={customerItems} columns={columns} onChange={this.handleTableChanges} />
                            </Box>
                        </Col>
                    </Row>
                </LayoutContentWrapper>
            </>
        )
    }
}


const mapStateToProps = state => {
    let { ...customers } = state.Customers;
    return {
        token: state.Auth.idToken,
        customerList: customers.customerList,
    }
}



export default connect(mapStateToProps)(Customers);