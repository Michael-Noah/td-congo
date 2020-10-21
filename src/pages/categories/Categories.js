import React from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as salesActions from '@iso/redux/sales/actionCreators';
import { Card, Col, Row, Avatar } from 'antd';
// import { itemExistsInAny } from '@iso/lib/helpers/ItemSearchString';
import { connect } from 'react-redux';
import Meta from 'antd/lib/card/Meta';


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




class CategoriesPage extends React.Component {

    state = {
        imageReady: {},
    }

    imageReady = (index, val) => {
        this.setState((prevState) => ({
            imageReady: {
                ...prevState.imageReady,
                [index]: val
            }
        }));
    }

    componentDidMount() {
        let { dispatch } = this.props;
        !this.props.categoryList && dispatch(salesActions.getCategories());
    }


    render() {
        let { categoryList } = this.props;
        let categoryCards = [];
        if (categoryList) {
            categoryCards = Object.keys(categoryList).map((category, index) => {
                return (
                    <Col key={category} span={6}>
                        <Card
                            loading={!this.state.imageReady[index]}
                            key={category}
                            cover={<img
                                hidden={!this.state.imageReady[index]}
                                alt="example"
                                onLoad={() => { this.imageReady(index, true) }}
                                src="https://www.placecage.com/c/640/480"
                            />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://www.placecage.com/100/50" />}
                                title={categoryList[category].name}
                                description={``}
                            />
                        </Card>
                    </Col>
                )
            })
        }
        return (
            <LayoutContentWrapper style={styles.PageStyle}>
                <Row style={basicStyle.rowStyle} gutter={[16, 16]}>
                    {categoryCards}
                </Row>
            </LayoutContentWrapper>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.idToken,
        categoryList: state.Sales.categoryList,
        loading: state.Sales.loading,
    }
}

export default connect(mapStateToProps)(CategoriesPage);