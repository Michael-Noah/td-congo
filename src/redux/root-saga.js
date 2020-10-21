import { all } from 'redux-saga/effects';
import authSagas from '@iso/redux/auth/saga';
import ecommerceSaga from '@iso/redux/ecommerce/saga';
import { fetchProductsSaga } from '@iso/redux/sales/sagas';

export default function* rootSaga(getState) {
  yield all([authSagas(), ecommerceSaga(), fetchProductsSaga()]);
}
