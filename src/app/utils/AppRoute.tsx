import * as React from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { LazyRoute } from '@app/utils/LazyRoute';
import { useA11yRouteChange } from './useA11yRouteChange';
import { useDocumentTitle } from './useDocumentTitle';

export type IRenderType<ComponentProps, R> = (props: IRenderProps<ComponentProps, R>) => React.ReactNode;

export interface IRenderProps<ComponentProps, R> {
  Component: React.ComponentType<ComponentProps>;
  route: RouteComponentProps<R>;
  subroutes?: React.ReactNode;
  redirect: (to: string) => React.ReactNode
}

export interface IAppRouteProps<ComponentProps, R> {
  path: string;
  exact?: boolean;
  title: string;
  Component?: React.ComponentType<ComponentProps>;
  getComponent?: () => Promise<React.ComponentType<ComponentProps>>;
  render?: IRenderType<ComponentProps, R>;
  children?: (path: string) => React.ReactNode;
}

export function AppRoute<ComponentProps, RouteParams>({
  path,
  exact = false,
  title,
  Component,
  getComponent,
  children,
  render = ({ Component }) => (<Component>{ children && children(path) }</Component>)
}: IAppRouteProps<ComponentProps, RouteParams>) {
  const isAsync = typeof getComponent === 'function';
  const subroutes = children && children(path);

  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  const redirectFactory = (route: RouteComponentProps<RouteParams>) => (to: string) => (
    <>
      <Redirect
        from={route.match.path}
        to={to}
      />
      {subroutes}
    </>
  );
  
  const renderAsyncComponent = (route: RouteComponentProps<RouteParams>) => {
    return (
      <LazyRoute<ComponentProps, RouteParams> 
        route={route} 
        getComponent={getComponent!} 
        renderComponent={(props) => render({ 
          ...props, 
          redirect: redirectFactory(route),
          subroutes 
        })} 
      />
    );
  };

  const renderSyncComponent = (route: RouteComponentProps<RouteParams>) => {
    return render({
      Component: Component!,
      subroutes,
      redirect: redirectFactory(route),
      route
    });
  };

  return (
    <Route
      render={isAsync ? renderAsyncComponent : renderSyncComponent}
      exact={exact}
      path={path}
      key={path}
    />
  );
}
