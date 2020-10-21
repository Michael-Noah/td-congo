import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import Stats from '@iso/redux/stats/reducer';
import Sales from '@iso/redux/sales/reducer';
import Customers from '@iso/redux/customers/reducer';
import Vendors from '@iso/redux/vendors/reducer';
import Locations from '@iso/redux/locations/reducer';
import Connection from '@iso/redux/connectivity/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import Ecommerce from '@iso/redux/ecommerce/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';


export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  Ecommerce,
  LanguageSwitcher,
  Stats,
  Sales,
  Customers,
  Vendors,
  Locations,
  Connection,
});
