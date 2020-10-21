import React, { Component } from 'react';
import { Row, Col } from 'antd';
import basicStyle from '@iso/assets/styles/constants';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
// import LayoutContent from '@iso/components/utility/layoutContent';
import InfoWidget from '@iso/containers/Widgets/Report/ReportWidget';
import WidgetWrapper from '@iso/containers/Widgets/WidgetsWrapper';
import { FaBox, FaDollarSign, FaLayerGroup, FaLocationArrow, FaToolbox, FaTruckLoading, FaUserAlt, FaUserFriends } from 'react-icons/fa';
// import axios from 'axios';
import { connect } from 'react-redux';
import * as statsActions from '@iso/redux/stats/actionCreators';
import { StatsWidget } from '../components/StatsWidget/StatsWidget';
import { SalesWidget } from '../components/SalesWidget/SalesWidget';
// import LoaderComponent from '@iso/components/utility/loader';

const styles = {
  PageStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
};


class HomePage extends Component {



  componentDidMount() {
    let { token, dispatch } = this.props;
    dispatch(statsActions.getNumTransactions(token));
    dispatch(statsActions.getNumProducts(token));
    dispatch(statsActions.getNumCustomers(token));
    dispatch(statsActions.getNumVendors(token));
    dispatch(statsActions.getNumUsers(token));
    dispatch(statsActions.getNumLocations(token));
    dispatch(statsActions.getNumCategories(token));
    dispatch(statsActions.getNumRevenueYTD(token));

  }

  render() {
    let { ...properties } = this.props;
    return (
      <>
        {/* <LoaderComponent /> */}
        <LayoutWrapper>
          <div style={styles.PageStyle}>
            <InfoWidget label={"T&D Group S.A.R.L"}>
              <Row style={basicStyle.rowStyle} gutter={0} justify="start">
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numTransactions}
                    text="Total Transactions"
                    IconLib={<FaDollarSign style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numProducts}
                    text="Total Products"
                    IconLib={<FaBox style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numServices}
                    text="Total Services"
                    IconLib={<FaToolbox style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numCustomers}
                    text="Total Customers"
                    IconLib={<FaUserFriends style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numVendors}
                    text="Total Vendors"
                    IconLib={<FaTruckLoading style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numUsers}
                    text="Total Users"
                    IconLib={<FaUserAlt style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numLocations}
                    text="Total Locations"
                    IconLib={<FaLocationArrow style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                  <StatsWidget
                    number={properties.numCategories}
                    text="Total Categories"
                    IconLib={<FaLayerGroup style={{ fontSize: '1.5rem' }} />}
                    fontColor="#ffffff"
                    color="#7ED321"
                  />
                </Col>
              </Row>
            </InfoWidget>
            <Row style={basicStyle.rowStyle} gutter={0} justify="start">
              <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                <WidgetWrapper>
                  <SalesWidget
                    label={"Revenue this month"}
                    amount={properties.numRevenueMonth}
                    sign="$"
                    details={"This is a sample sales widget, aka 2020"}
                    fontColor={"#f0cf33"}
                  />
                </WidgetWrapper>
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                <WidgetWrapper>
                  <SalesWidget
                    label={"Revenue Last Month"}
                    amount={properties.numRevenuePrevMonth}
                    sign="$"
                    details={"This is a sample sales widget, aka 2020"}
                    fontColor={"#f0cf33"}
                  />
                </WidgetWrapper>
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                <WidgetWrapper>
                  <SalesWidget
                    label={"TOTAL REVENUE "+new Date().getFullYear()}
                    amount={properties.numRevenueYTD}
                    sign="$"
                    details={"This is a sample sales widget, aka 2020"}
                    fontColor={"#f0cf33"}
                  />
                </WidgetWrapper>
              </Col>
              <Col lg={6} md={12} sm={12} xs={24} style={basicStyle.colStyle}>
                <WidgetWrapper>
                  <SalesWidget
                    label={"USER TRANSACTIONS "+new Date().getFullYear()}
                    amount={properties.numTransactionsUser}
                    sign=""
                    details={"This is a sample sales widget, aka 2020"}
                    fontColor={"#f0cf33"}
                  />
                </WidgetWrapper>
              </Col>
            </Row>
          </div>
        </LayoutWrapper>



      </>
    );
  }
}

const mapStateToProps = state => {
  let { ...stats } = state.Stats;
  return {
    token: state.Auth.idToken,

    numTransactions: stats.numTransactions,
    numProducts: stats.numProducts,
    numServices: stats.numServices,
    numCustomers: stats.numCustomers,
    numVendors: stats.numVendors,
    numUsers: stats.numUsers,
    numLocations: stats.numLocations,
    numCategories: stats.numCategories,
    numRevenueMonth: stats.numRevenueMonth,
    numRevenuePrevMonth: stats.numRevenuePrevMonth,
    numRevenueYTD: stats.numRevenueYTD,
    numTransactionsUser: stats.numTransactionsUser,
    error: stats.error,
  }
}


export default connect(mapStateToProps)(HomePage);