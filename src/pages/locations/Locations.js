import React from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as locationsActions from '@iso/redux/locations/actionCreators';
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




class LocationPage extends React.Component {

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
        !this.props.locationList && dispatch(locationsActions.getLocations());
    }


    render() {
        let { locationList } = this.props;
        let locationCards = [];
        if (locationList) {
            locationCards = Object.keys(locationList).map((location, index) => {
                return (
                    <Col key={location} span={6}>
                        <Card
                            loading={!this.state.imageReady[index]}
                            key={location}
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
                                title={locationList[location].name}
                                description={
                                    <div>
                                        <p><strong>Country: </strong>{locationList[location].country}</p>
                                        <p><strong>Address: </strong>{locationList[location].address}</p>
                                        <p><strong>Phone: </strong>{locationList[location].phone}</p>
                                        <p><strong>Email: </strong>{locationList[location].email}</p>
                                        <p><strong>User Accounts: </strong>{locationList[location].email}</p>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                )
            })
        }
        return (
            <LayoutContentWrapper style={styles.PageStyle}>
                <Row style={basicStyle.rowStyle} gutter={[16, 16]}>
                    {locationCards}
                </Row>
            </LayoutContentWrapper>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.idToken,
        locationList: state.Locations.locationList,
        loading: state.Sales.loading,
    }
}

export default connect(mapStateToProps)(LocationPage);