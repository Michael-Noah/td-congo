import React, { Component } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import * as salesActions from '@iso/redux/sales/actionCreators';
import { connect } from 'react-redux';
import { Button, Col, Input, Popconfirm, Row, Space, Table, Tag } from 'antd';
import { itemExistsInAny } from '@iso/lib/helpers/ItemSearchString';
import Box from '@iso/components/utility/box';
import { AddInventoryModal } from '../ModalPages/AddInventory/AddInventory';

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





class Inventory extends Component {

    state = {
        searchQuery: "",
        filteredInfo: null,
        sortedInfo: null,
        addInventoryData: {
            name: "", category: "", location: "", vendor: "", buyPrice: "", cost: "", availableStore: "", unit: "", partNum: "", code: "", img: "",
        },
        editInventoryData: {
            name: "", category: "", location: "", vendor: "", buyPrice: "", cost: "", unit: "", partNum: "",
        },
        addModal: false,
        editModal: false,
    }


    toggleAddModal = () => {
        this.setState((prevState) => ({
            addModal: !prevState.addModal
        }));
    }

    submitInventoryData = () => {
        this.toggleAddModal();

    }

    handleTableChanges = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    addInventoryDataChanged = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState((prevState) => ({
            addInventoryData: {
                ...prevState.addInventoryData,
                [name]: value,
            }
        }));
    }


    componentDidMount() {
        let { dispatch } = this.props;
        !this.props.productList && dispatch(salesActions.getProducts());
        !this.props.categoryList && dispatch(salesActions.getCategories());
    }

    getCategory = (abbr) => {
        return Object.keys(this.props.categoryList).filter(category => {
            return this.props.categoryList[category].abbreviation === abbr;
        })[0];
    }





    render() {


        let { filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};
        let categoryFilters = [];
        if (this.props.categoryList) {
            categoryFilters = Object.keys(this.props.categoryList).map(catKey => {
                return { text: this.props.categoryList[catKey].name, value: this.props.categoryList[catKey].name }

            });
        }
        const columns = [
            {
                title: 'ITEM',
                dataIndex: 'item',
                key: 'item',
                width: '15%',
                ellipsis: true,
                sorter: (a, b) => a.item.localeCompare(b.item, { ignorePunctuation: true, sensitivity: 'base' }),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'PART NO',
                dataIndex: 'partNum',
                key: 'partNum',
                ellipsis: true,
                sorter: (a, b) => a.partNum.localeCompare(b.partNum, { ignorePunctuation: true, sensitivity: 'base' }),
                render: (partNum) => partNum ? partNum : 'NONE SET'
            },
            {
                title: 'LOCATION',
                dataIndex: 'location',
                key: 'location',
                width: '12%',
            },
            {
                title: 'CATEGORY',
                dataIndex: 'category',
                key: 'category',
                width: '16%',
                sorter: (a, b) => a.category.localeCompare(b.category),
                filters: categoryFilters,
                filteredValue: filteredInfo.category || null,
                onFilter: (value, record) => { return value === record.category },
                render: (category) => {
                    let { categoryList } = this.props;
                    let colors = ['geekblue', 'green', 'yellow', 'lime', 'processing', 'orange', 'pink', 'red', 'cyan'];
                    let catArray = Object.keys(categoryList).map(catKey => {
                        return categoryList[catKey].name;

                    });
                    return (
                        <Tag color={colors[catArray.indexOf(category)]} key={category}>
                            {category}
                        </Tag>
                    )
                }
            },
            {
                title: 'PRICE',
                dataIndex: 'price',
                key: 'price',
                width: '7%',
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'NO',
                dataIndex: 'number',
                key: 'number',
                width: '7%',
                sorter: (a, b) => a.number - b.number,
                render: (number) => number !== '-9999' ? number : 'N/A'
            },
            {
                title: 'VALUE',
                dataIndex: 'value',
                key: 'value',
                width: '7%',
                sorter: (a, b) => a.value - b.value,
                render: (value) => value !== '-9999' ? value : 'N/A'
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




        let inventoryItems = [];
        if (this.props.productList && this.props.categoryList) {
            Object.keys(this.props.productList).map((category) => {
                Object.keys(this.props.productList[category]).map((item) => {
                    let dateConfig = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                    let productItem = this.props.productList[category][item];
                    let catKey = this.getCategory(category);
                    let prodItemtoSearch = [(productItem.name).trim(), productItem.code, (productItem.partNum).trim()];
                    if (itemExistsInAny(prodItemtoSearch, this.state.searchQuery)) {
                        inventoryItems.push({
                            key: item,
                            item: (productItem.name).trim(),
                            partNum: (productItem.partNum).trim(),
                            location: productItem.location,
                            category: this.props.categoryList[catKey].name,
                            price: productItem.cost,
                            number: category !== "Services" ? productItem.availableStore : "-9999",
                            value: category !== "Services" ? parseFloat(productItem.cost * productItem.availableStore) : "-9999",
                            date: new Date(productItem.time).toLocaleString([], dateConfig),
                            epoch: productItem.datemodified,
                            action: "Delete",
                        })
                    }
                    return null;
                })
                return null;
            })
        }
        return (
            <>
                <AddInventoryModal
                    visible={this.state.addModal}
                    data={this.state.addInventoryData}
                    changed={this.addInventoryDataChanged}
                    cancel={this.toggleAddModal}
                    submit={this.submitInventoryData}
                />
                <LayoutContentWrapper style={styles.PageStyle}>
                    <Row style={basicStyle.rowStyle}>
                        <Col lg={24} style={basicStyle.colStyle}>
                            <Box title="Inventory">
                                <Space style={{ marginBottom: 16 }}>
                                    <Button onClick={this.toggleAddModal} className="btn-success" block size="large">ADD PRODUCT</Button>
                                </Space>
                                <Input size="large" type="search" placeholder="search" value={this.state.searchQuery} onChange={(e) => { this.setState({ searchQuery: e.target.value }) }} />
                                <Table loading={!this.props.productList} size="small" pagination={true} dataSource={inventoryItems} columns={columns} onChange={this.handleTableChanges} />
                            </Box>
                        </Col>
                    </Row>
                </LayoutContentWrapper>
            </>
        )
    }
}


const mapStateToProps = state => {
    let { ...sales } = state.Sales;
    return {
        token: state.Auth.idToken,
        productList: sales.productList,
        categoryList: sales.categoryList,
    }
}



export default connect(mapStateToProps)(Inventory);