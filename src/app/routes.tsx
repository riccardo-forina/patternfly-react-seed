import * as React from 'react';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { SyncRoute, AsyncRoute } from '@app/utils/Route';
import { IParameterizedProps } from '@app/Parameterized/Parameterized';

const getSupportComponent = async () => {
  const module = await import(/* webpackChunkName: 'support' */ '@app/Support/Support');
  return module.Support;
};

const getParameterizedComponent = async () => {
  const module = await import(/* webpackChunkName: 'parameterized' */ '@app/Parameterized/Parameterized');
  return module.Parameterized;
};

export const routes = [
  new SyncRoute({
    path: '/',
    title: 'Dashboard',
    label: 'Dashboard',
    exact: true,
    Component: Dashboard
  }),
  new AsyncRoute({
    path: '/support',
    title: 'Support',
    label: 'Support',
    exact: true,
    getComponent: getSupportComponent,
  }),
  new AsyncRoute<IParameterizedProps, { fooInTheUrl?: number }>({
    path: '/parameterized/:fooInTheUrl?',
    title: 'Parameterized',
    label: 'Parameterized',
    exact: true,
    getComponent: getParameterizedComponent,
    render: ({ Component, route }) => <Component foo={route.match.params.fooInTheUrl || 1} />
  }),
];
