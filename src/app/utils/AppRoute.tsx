import * as React from 'react';
import { RouteComponentProps, Route } from 'react-router';
import { useA11yRouteChange } from '@app/utils/useA11yRouteChange';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LazyRoute } from './LazyRoute';

export interface IRenderProps<P, R> {
  Component: React.ReactType<P>;
  route: RouteComponentProps<R>;
}

export interface IAppRouteProps<P, R> {
  isAsync?: boolean;
  exact?: boolean;
  path: string;
  title: string;
  getComponent: () => Promise<React.ComponentType<P>>
  render: (props: IRenderProps<P, R>) => React.ReactNode;
}

export function AppRoute<P, R> ({
  isAsync = false,
  title,
  render,
  getComponent,
  ...rest
}: React.PropsWithChildren<IAppRouteProps<P, R>>) {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  const routeRender = React.useCallback(
    (route: RouteComponentProps<R>) => {
      return (
        <LazyRoute<P, R> 
          route={route}
          getComponent={getComponent}
          renderComponent={render}
        />
      );
    },
    [render, getComponent]
  );

  return <Route<R> render={routeRender} {...rest} />;
};