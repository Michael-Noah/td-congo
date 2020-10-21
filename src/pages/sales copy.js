import React, { Component } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Imagefile from '@iso/assets/images/work.jpg';
import ContentHolder from '@iso/components/utility/contentHolder';
import AutoComplete, { AutoCompleteOption as Option } from '@iso/components/uielements/autocomplete';
import { Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Table from '@iso/components/uielements/table';
import Input from '@iso/components/uielements/input';
import ProductCard from '../components/ProductCard/ProductCard';
import BottomCalcBar from '../components/BottomCalcBar/BottomCalcBar';
import * as salesActions from '@iso/redux/sales/actionCreators';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';


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
        overflowY: 'scroll', overflow: 'auto', height: "40%"
    },
};



const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
    {
        key: '3',
        name: 'Johna',
        age: 41,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
    {
        key: '4',
        name: 'Johnas',
        age: 43,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
    {
        key: '5',
        name: 'AJohn',
        age: 42,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
    {
        key: '6',
        name: 'Jonathan',
        age: 47,
        address: '10 Downing Street',
        street: 'cape canaveral street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Street',
        dataIndex: 'street',
        key: 'street',
    },
];



function callback(key) { }


class Sales extends Component {


    categsObject = {};

    productCards = () => {
        if (!this.props.productList || !this.props.categoryList) {
            return;
        }
        Object.keys(this.props.productList).map(category => {
            Object.keys(this.props.productList[category]).map(prodKey => {
                this.categsObject = {
                    ...this.categsObject, [category]: {
                        ...this.categsObject[category], [prodKey]:
                            <Col key={prodKey} xxl={4} xl={6} lg={8} md={8} sm={12} xs={12} style={basicStyle.colStyle}>
                                <ProductCard
                                    alt={this.props.productList[category][prodKey].name}
                                    img={this.props.productList[category][prodKey].src}
                                    text={this.props.productList[category][prodKey].name}
                                    subtext={this.props.productList[category][prodKey].partNum} />
                            </Col>
                    }
                }
                return null;
            })
            return null;
        })

    }


    componentDidMount() {
        let { token, dispatch } = this.props;

        dispatch(salesActions.getCategories(token));
        dispatch(salesActions.getProducts(token));

    }

    render() {
        this.productCards();
        return (
            <>
                <LayoutContentWrapper style={styles.PageStyle}>
                    <Row style={basicStyle.rowStyle}>
                        <Col lg={12} md={12} sm={12} xs={24} style={{ ...basicStyle.colStyle }}>
                            <Box title={"Products"}>
                                <Tabs onChange={callback} type="card" style={styles.tabsStyle}>
                                    <TabPane tab="Servicing" key="1">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59762548') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Mechanical" key="2">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59768596') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Electricals" key="3">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59768162') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>

                                    </TabPane>
                                    <TabPane tab="Suspension" key="4">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59769318') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Washing Bay" key="5">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59768719') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Car Interior" key="6">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'cat_59765185') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="SERVICES" key="7">
                                        <Row>
                                            {this.categsObject !== {} && Object.keys(this.categsObject).map(key => {
                                                if (key === 'Services') {
                                                    return Object.keys(this.categsObject[key]).map(skey => {
                                                        return this.categsObject[key][skey];
                                                    });
                                                }
                                                return null;
                                            })}
                                        </Row>
                                    </TabPane>
                                </Tabs>
                            </Box>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                            <Box>
                                <Row justify="space-between">
                                    <Col lg={10} md={10} sm={10} xs={11}>
                                        <ContentHolder>
                                            <Input placeholder="Recepient" />
                                        </ContentHolder>
                                    </Col>
                                    <Col lg={10} md={10} sm={10} xs={11}>
                                        <ContentHolder>
                                            <AutoComplete
                                                onChange={() => { }}
                                                placeholder="Customer">
                                                <Option>has data 1</Option>
                                                <Option>has data 2</Option>
                                            </AutoComplete>
                                        </ContentHolder>
                                    </Col>
                                </Row>
                                <br />
                                <div style={styles.outTableStyle}>
                                    <Table size="small" pagination={false} dataSource={dataSource} columns={columns} />
                                </div>
                                <br />
                                <Row>
                                    <BottomCalcBar title={'Subtotal:'} value={"$100"} primary />
                                    <BottomCalcBar title={'Discount:'} value={"$10"} />
                                    <BottomCalcBar title={'Tax:'} value={"$18"} primary />
                                    <BottomCalcBar title={'Total:'} value={"$108"} />
                                </Row>
                                <Row justify="space-between">
                                    <Col lg={10} md={10} sm={10} xs={11}>
                                        <ContentHolder>
                                            <Button block size="large"
                                                type="default"
                                                icon={<CloseOutlined />}
                                                loading={false}
                                                onClick={() => { }}>
                                                Cancel
                                                    </Button>
                                        </ContentHolder>
                                    </Col>
                                    <Col lg={10} md={10} sm={10} xs={11}>
                                        <ContentHolder>
                                            <Button block size="large"
                                                style={{ background: '#7ED320' }}
                                                icon={<CheckOutlined />}
                                                loading={false}
                                                onClick={() => { }}>
                                                Continue
                                                    </Button>
                                        </ContentHolder>
                                    </Col>
                                </Row>
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



export default connect(mapStateToProps)(Sales);