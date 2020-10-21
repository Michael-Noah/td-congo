import React from 'react';
import { SidebarPagesIcon } from '@iso/config/icon.config';

const options = [
  {
    key: 'blankPage',
    label: 'sidebar.blankPage',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'sales',
    label: 'Sales',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'customers',
    label: 'Customers',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'vendors',
    label: 'Vendors',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'categories',
    label: 'Categories',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'locations',
    label: 'Locations',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
  {
    key: 'authCheck',
    label: 'sidebar.authCheck',
    leftIcon: <SidebarPagesIcon size={19} />,
  },
];
export default options;
