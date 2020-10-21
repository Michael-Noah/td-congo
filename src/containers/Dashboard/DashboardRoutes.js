import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: '',
    component: lazy(() => import('../../pages/HomePage')),
    exact: true,
  },
  {
    path: 'sales',
    component: lazy(() => import('../../pages/sales/Sales')),
  },
  {
    path: 'inventory',
    component: lazy(() => import('../../pages/inventory/Inventory')),
  },
  {
    path: 'customers',
    component: lazy(() => import('../../pages/customers/Customers')),
  },
  {
    path: 'vendors',
    component: lazy(() => import('../../pages/vendors/Vendors')),
  },
  {
    path: 'categories',
    component: lazy(() => import('../../pages/categories/Categories')),
  },
  {
    path: 'locations',
    component: lazy(() => import('../../pages/locations/Locations')),
  },
  {
    path: 'blankPage',
    component: lazy(() => import('../../pages/BlankPage')),
  },
  {
    path: 'authCheck',
    component: lazy(() => import('../../pages/AuthCheck')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
