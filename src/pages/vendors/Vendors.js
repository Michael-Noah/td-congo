import React, { Component } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import * as vendorsActions from '@iso/redux/vendors/actionCreators';
import { connect } from 'react-redux';
import { Button, Col, Input, Popconfirm, Row, Space, Table } from 'antd';
import { itemExistsInAny } from '@iso/lib/helpers/ItemSearchString';
import Box from '@iso/components/utility/box';
import { AddVendorModal } from '../ModalPages/AddVendor/AddVendor';

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





class Vendors extends Component {

    state = {
        searchQuery: "",
        filteredInfo: null,
        sortedInfo: null,
        addVendorData: {
            name: "", type: "", taxId: "", contactName: "", contact: "", status: "",
        },
        EditVendorData: {
            name: "", type: "", taxId: "", contactName: "", contact: "", status: "",
        },
        addModal: false,
        editModal: false,
    }


    toggleAddModal = () => {
        this.setState((prevState) => ({
            addModal: !prevState.addModal
        }));
    }

    submitVendorData = () => {
        this.toggleAddModal();

    }

    handleTableChanges = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    addVendorDataChanged = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState((prevState) => ({
            addVendorData: {
                ...prevState.addVendorData,
                [name]: value,
            }
        }));
    }


    componentDidMount() {
        let { dispatch } = this.props;
        !this.props.vendorList && dispatch(vendorsActions.getVendors());
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
                title: 'TYPE',
                dataIndex: 'type',
                key: 'type',
                ellipsis: true,
                sorter: (a, b) => a.type.localeCompare(b.type, { ignorePunctuation: true, sensitivity: 'base' }),
            },
            {
                title: 'CONTACT NAME',
                dataIndex: 'contactName',
                key: 'contactName',
                ellipsis: true,
                sorter: (a, b) => a.contactName.localeCompare(b.contactName, { ignorePunctuation: true, sensitivity: 'base' }),
            },
            {
                title: 'PHONE/EMAIL',
                dataIndex: 'contact',
                key: 'contact',
                width: '12%',
                sorter: (a, b) => a.contact.localeCompare(b.contact, { ignorePunctuation: true, sensitivity: 'base' }),
                render: (contact) => contact ? contact : 'NONE SET'
            },
            {
                title: 'TAX ID',
                dataIndex: 'tin',
                key: 'tin',
                ellipsis: true,
                sorter: (a, b) => a.tin.localeCompare(b.tin, { ignorePunctuation: true, sensitivity: 'base' }),
            },
            {
                title: 'STATUS',
                dataIndex: 'status',
                key: 'status',
                width: '12%',
                sorter: (a, b) => a.status.localeCompare(b.status, { ignorePunctuation: true, sensitivity: 'base' }),
                render: (status) => status ? status : 'NONE SET'
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

        let VendorItems = [];
        if (this.props.vendorList) {
            Object.keys(this.props.vendorList).map((vendor) => {
                // let dateConfig = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                let vendorItem = this.props.vendorList[vendor];
                let vendorSearchParams = [(vendorItem.name).trim(), (vendorItem.contact).trim()];
                if (itemExistsInAny(vendorSearchParams, this.state.searchQuery)) {
                    VendorItems.push({
                        key: vendor,
                        name: (vendorItem.name).trim(),
                        type: vendorItem.type,
                        contactName: (vendorItem.contactName).trim(),
                        contact: vendorItem.contact,
                        status: vendorItem.status,
                        tin: vendorItem.taxId,
                        action: "Delete",
                    })
                };
                return null;
            })
        }

        return (
            <>
                <AddVendorModal
                    visible={this.state.addModal}
                    data={this.state.addVendorData}
                    changed={this.addVendorDataChanged}
                    confirm={this.submitVendorData}
                    cancel={this.toggleAddModal} />
                <LayoutContentWrapper style={styles.PageStyle}>
                    <Row style={basicStyle.rowStyle}>
                        <Col lg={24} style={basicStyle.colStyle}>
                            <Box title="Vendors">
                                <Space style={{ marginBottom: 16 }}>
                                    <Button onClick={this.toggleAddModal} className="btn-success" block size="large">ADD VENDOR</Button>
                                </Space>
                                <Input size="large" type="search" placeholder="search" value={this.state.searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }) }} />
                                <Table loading={!this.props.vendorList} size="small" pagination={true} dataSource={VendorItems} columns={columns} onChange={this.handleTableChanges} />
                            </Box>
                        </Col>
                    </Row>
                </LayoutContentWrapper>
            </>
        )
    }
}


const mapStateToProps = state => {
    let { ...vendors } = state.Vendors;
    return {
        token: state.Auth.idToken,
        vendorList: vendors.vendorList,
    }
}



export default connect(mapStateToProps)(Vendors);