import React from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import { TabPane } from '@iso/components/uielements/tabs';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as salesActions from '@iso/redux/sales/actionCreators';
import * as customerActions from '@iso/redux/customers/actionCreators';
import { connect } from 'react-redux';
import { Button, Col, Input, Row, message, notification } from 'antd';
import { itemExistsInAny } from '@iso/lib/helpers/ItemSearchString';
import './Sales.css';
import AppSpinner from '../../components/SpinnerWidget/SpinnerWidget';
import CheckoutArea from './CheckoutArea/CheckoutArea';
import SelectionArea from './SelectionArea/SelectionArea';
import QuantityCounter from '../../components/QuantityCounter/QuantityCounter';
import _ from 'lodash';
import { CheckoutSummaryModal } from '../ModalPages/CheckoutSummary/CheckoutSummary';

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        width: '8%',
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        ellipsis: true,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '16%',
    },
    {
        title: 'Total Price',
        dataIndex: 'ttlPrice',
        key: 'ttlPrice',
        width: '25%',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '16%',
    },
];


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




function callback(key) { }


class Sales extends React.PureComponent {

    state = {
        searchQuery: "",
        tax: 0,
        discount: 0,
        labor: 0,
        customer: "",
        recipient: "",
        checkoutData: null,
    }

    defaultState = {
        searchQuery: "",
        tax: 0,
        discount: 0,
        labor: 0,
        customer: "",
        recipient: "",
    }

    connMsg = () => {
        message.error(`ERROR: ${this.props.connMsg}`);
        // this.props.dispatch(connActions.clearMessage());
    }

    initializeCheckouts = (evt, data) => {
        evt.preventDefault();

        let cleanData = { ...data };
        delete cleanData.customer;

        let checkoutData = {
            bill: { ...cleanData },
            cashier: this.props.uid,
            customer: {
                contact: this.props.customerList[data.customer].contact,
                name: this.state.customer,
            },
            products: this.props.checkoutItems,
            recipient: this.state.recipient,
            time: Date.now(),
        }
        this.setState({ checkoutData: checkoutData });
        this.props.dispatch(salesActions.toggleCheckoutModal(true));
    }

    toggleCheckoutModal = () => {
        this.props.dispatch(salesActions.toggleCheckoutModal());
    }

    submitCheckouts = (e) => {
        if (this.props.connectivity) {
            this.props.dispatch(salesActions.submitCheckoutData(this.state.checkoutData, this.props.productList));
        }
        else {
            this.connMsg();
            setTimeout(() => {
                this.props.dispatch(salesActions.toggleCheckoutModal(false));
            }, 2000);
        }
        //this.setState({ CheckoutModal: false, checkoutData: null });
    }

    setSearch = (evt) => {
        this.setState({ searchQuery: evt.target.value });
    }

    setCustomer = (val) => {
        this.setState({ customer: val });
    }
    setRecipient = (evt) => {
        this.setState({ recipient: evt.target.value });
    }
    draggingItem = (evt, data) => {
        evt.dataTransfer.setData('productItem', JSON.stringify(data));
    }

    droppingItem = (evt) => {
        evt.preventDefault();
        this.toggleDragging();
        let { dispatch } = this.props;
        let data = evt.dataTransfer.getData('productItem');
        data = { ...JSON.parse(data), all: true };
        dispatch(salesActions.addItemsToCart(data))
    }

    allowDropItem = (evt) => {
        evt.preventDefault();
    }

    toggleDragging = () => {
        // this.setState((prevState) => ({ dragging: !prevState.dragging }));
    }

    addToCart = (data) => {
        let { dispatch } = this.props;
        dispatch(salesActions.addItemsToCart(data));
    }

    removeFromCart = (data) => {
        let { dispatch } = this.props;
        dispatch(salesActions.removeItemsFromCart(data));
    }

    calcToCart = (evt, data) => {
        let { dispatch } = this.props;
        let maxValue = data.available + data.amount;
        if (evt.target.value === "" || evt.target.value > maxValue || evt.target.value === "0") { return }
        dispatch(salesActions.calcItemsToCart(evt.target.value, data));
    }

    cancelCart = () => {
        let { dispatch } = this.props;
        this.setState({ ...this.defaultState });
        dispatch(salesActions.cancelCart());
    }

    componentDidMount() {
        let { token, dispatch } = this.props;
        !this.props.categoryList && dispatch(salesActions.getCategories(token));
        !this.props.productList && dispatch(salesActions.getProducts(token));
        !this.props.customerList && dispatch(customerActions.getCustomers(token));
    }



    render() {
        let errormsg = () => {
            message.error(`ERROR: ${this.props.error?.code}`);
            this.props.dispatch(salesActions.clearMessage("error"));
        }
        let successmsg = () => {
            message.success(`SUCCESS: ${this.props.success}`);
            this.props.dispatch(salesActions.clearMessage("success"));
            this.setState(this.defaultState);
        }

        let infomsg = () => {
            notification.open({ message: `${this.props.info}` });
            this.props.dispatch(salesActions.clearMessage("info"));
        }

        // let connMsg = () => {
        //     message.error(`ERROR: ${this.props.connMsg}`);
        //     // this.props.dispatch(connActions.clearMessage());
        // }


        //push notifications handling
        this.props.error && errormsg();
        this.props.success && successmsg();
        this.props.info && infomsg();
        // !this.props.connectivity && connMsg();

        let { productList, categoryList } = this.props;
        let categories = <AppSpinner />;
        let rawproducts = {};
        if (productList !== null && categoryList !== null) {
            categories = Object.keys(categoryList).map(category => {
                return (
                    <TabPane tab={categoryList[category].name} key={category}>
                        <Row>
                            {productList[categoryList[category].abbreviation] ?
                                Object.keys(productList[categoryList[category].abbreviation]).map(product => {
                                    let productItem = productList[categoryList[category].abbreviation][product];
                                    if (itemExistsInAny([productItem.name, productItem.partNum, productItem.code], this.state.searchQuery)) {
                                        rawproducts = { ...rawproducts, [product]: { ...productItem } };
                                        return (
                                            <Col key={product} xxl={4} xl={6} lg={8} md={8} sm={12} xs={12} style={basicStyle.colStyle}>
                                                <ProductCard
                                                    click={() => this.addToCart({ ...productItem, category: categoryList[category].abbreviation })}
                                                    drag={(evt) => { this.draggingItem(evt, { ...productItem, category: categoryList[category].abbreviation, id: product }) }}
                                                    dragEnd={this.toggleDragging}
                                                    alt={productItem.name}
                                                    img={productItem.src}
                                                    text={productItem.name}
                                                    number={productItem.availableStore}
                                                    subtext={productItem.partNum}
                                                    pricing={productItem.cost}
                                                    code={productItem.code} />
                                            </Col>
                                        )
                                    }
                                    return null;
                                })
                                : <div>Category is Empty!</div>}
                        </Row>
                    </TabPane>
                )

            })
        }


        let checkouts = Object.keys(this.props.checkoutItems).map((item, index) => {
            let checkoutItem = this.props.checkoutItems[item];
            return {
                key: item,
                index: index + 1,
                product: checkoutItem.product,
                amount: <QuantityCounter
                    decrement={() => { this.removeFromCart({ ...checkoutItem, id: item }) }}
                    increment={() => { this.addToCart({ ...checkoutItem, id: item }) }}
                    value={checkoutItem.amount}
                    maxValue={parseInt(checkoutItem.available + checkoutItem.amount)}
                    changeInput={(e) => { this.calcToCart(e, { ...checkoutItem, id: item }) }} />,
                ttlPrice: parseFloat(checkoutItem.price * checkoutItem.amount),
                action: <Button onClick={() => { this.removeFromCart({ ...checkoutItem, id: item, delete: true }) }}>Clear</Button>,
                description: <>
                    <p><strong>Part Number: </strong>{checkoutItem.partNum ? checkoutItem.partNum : "NONE"}</p>
                    <p><strong>Code: </strong>{checkoutItem.code ? checkoutItem.code : "NONE"}</p>
                    <p>{checkoutItem.amount} {checkoutItem.unit}</p>
                </>,
            }
        })

        return (
            <>
                <CheckoutSummaryModal
                    visible={this.props.checkoutModal}
                    data={this.props.checkoutItems}
                    bill={this.state.checkoutData?.bill}
                    confirm={this.submitCheckouts}
                    cancel={this.toggleCheckoutModal} />

                <LayoutContentWrapper style={styles.PageStyle}>
                    <Row style={basicStyle.rowStyle}>
                        <Col lg={12} md={12} sm={12} xs={24} style={{ ...basicStyle.colStyle }}>
                            <SelectionArea
                                searchParams={this.state.searchQuery}
                                rawData={rawproducts}
                                title="Products"
                                tabSwitch={callback}
                                tabsStyle={styles.tabsStyle}
                                data={categories}>
                                <Input placeholder="search" type="search" value={this.state.searchQuery} onChange={this.setSearch} />
                            </SelectionArea>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                            <CheckoutArea
                                customers={this.props.customerList}
                                selectedCustomer={this.state.customer}
                                customerChanged={this.setCustomer}
                                recipient={this.state.recipient}
                                recipientChanged={this.setRecipient}
                                dragOver={this.allowDropItem}
                                dragEnter={this.toggleDragging}
                                drop={this.droppingItem}
                                dataSource={checkouts}
                                rawData={this.props.checkoutItems}
                                columns={columns}
                                glow={!_.isEmpty(this.props.checkoutItems)}
                                TableStyle={styles.outTableStyle}
                                cancel={this.cancelCart}
                                disableCancel={_.isEmpty(this.props.checkoutItems) || !this.state.customer || !this.state.recipient}
                                labor={this.state.labor}
                                discount={this.state.discount}
                                tax={this.state.tax}
                                onChangeDiscount={(e) => { this.setState({ discount: e.target.value }) }}
                                onChangeLabor={(e) => { this.setState({ labor: e.target.value }) }}
                                onChangeTax={(e) => { this.setState({ tax: e.target.value }) }}
                                noDiscount
                                taxConfig={{ max: 100, min: 0 }}
                                submit={this.initializeCheckouts}

                            />
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
        uid: state.Auth.uid,
        productList: sales.productList,
        categoryList: sales.categoryList,
        customerList: state.Customers.customerList,
        checkoutItems: sales.checkoutItems,
        checkoutModal: sales.checkoutModal,
        error: sales.error,
        success: sales.success,
        info: sales.info,
        connectivity: state.Connection.active,
        connMsg: state.Connection.message,
    }
}



export default connect(mapStateToProps)(React.memo(Sales));