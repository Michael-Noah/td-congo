import React from 'react';
import { Col, Modal, Row, Table } from 'antd';



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
        render: (item) => item + " USD"
    },
];




class CheckoutSummaryModal extends React.Component {


    render() {

        const bill = this.props.bill || {};

        const { visible, confirm, cancel, data } = this.props;
        let checkouts = Object.keys(data).map((item, index) => {
            let checkoutItem = data[item];
            return {
                key: item,
                index: index + 1,
                product: checkoutItem.product,
                amount: checkoutItem.amount,
                ttlPrice: parseFloat(checkoutItem.price * checkoutItem.amount),
                description: <>
                    <p><strong>Part Number: </strong>{checkoutItem.partNum ? checkoutItem.partNum : "NONE"}</p>
                    <p><strong>Code: </strong>{checkoutItem.code ? checkoutItem.code : "NONE"}</p>
                    <p>{checkoutItem.amount} {checkoutItem.unit}</p>
                </>,
            }
        })



        return (
            <>
                <Modal
                    width="60%"
                    title="Checkout Summary"
                    visible={visible}
                    onOk={confirm}
                    // confirm={confirm}
                    onCancel={cancel}
                >
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={24}>
                            <Table
                                showHeader={false}
                                scroll={{ y: '30vh' }}
                                size="small"
                                columns={columns}
                                dataSource={checkouts}
                                expandable={{
                                    expandedRowRender: record => <div style={{ margin: 0 }}>{record.description}</div>,
                                    rowExpandable: record => record.name !== 'Not Expandable',
                                }} />
                        </Col>
                        <Col>
                            <Row gutter={[16,16]}>
                                <Col>{bill.subtotal !== bill.grandtotal && <p><strong>Subtotal: </strong>{bill.subtotal + " USD"}</p>}</Col>
                                <Col>{bill.tax > 0 && <p><strong>Tax: </strong>{bill.tax + "%"}</p>}</Col>
                                <Col>{bill.labor > 0 && <p><strong>Labor: </strong>{bill.labor + " USD"}</p>}</Col>
                                <Col>{bill.grandtotal && <p><strong>Total Bill: </strong>{bill.grandtotal + " USD"}</p>}</Col>
                            </Row>
                        </Col>
                    </Row>

                </Modal>
            </>
        );
    }
}

export { CheckoutSummaryModal };