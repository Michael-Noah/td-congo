import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import * as connectivityActions from '@iso/redux/connectivity/actionCreators';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';
import TopbarWrapper from './Topbar.styles';
import { TopbarMenuIcon } from '@iso/config/icon.config';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

function Topbar() {
  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );
  // const connectionActive = useSelector(
  //   (state) => state.Connection.active
  // );
  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };

  dispatch(connectivityActions.isConnected());
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          >
            <TopbarMenuIcon size={24} color={customizedTheme.textColor} />
          </button>
        </div>

        <ul className="isoRight">
          <li className="isoSearch">
            <TopbarSearch />
          </li>

          <li
            onClick={() => setSelectedItem('notification')}
            className={selectedItem ? 'isoNotify active' : 'isoNotify'}
          >
            <TopbarNotification />
          </li>

          <li onClick={() => setSelectedItem('message')} className="isoMsg">
            <TopbarMessage />
          </li>
          <li onClick={() => setSelectedItem('addToCart')} className="isoCart">
            <TopbarAddtoCart />
          </li>

          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}

// const mapStateToProps = state => {
//   return {
//     connectionActive: state.Connection.active,
//   }
// }

export default Topbar;