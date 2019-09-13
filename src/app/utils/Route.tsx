import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { LazyRoute } from '@app/utils/LazyRoute';

export type IRenderType<P, R> = (props: IRenderProps<P, R>) => React.ReactNode;

export interface IRenderProps<P, R> {
  Component: React.ComponentType<P>;
  route: RouteComponentProps<R>;
}

export interface IAppRouteProps<P, R> {
  path: string;
  title: string; 
  label: string; 
  exact: boolean; 
  isAsync: boolean; 
  Component?: React.ComponentType<P>; 
  getComponent?: () => Promise<React.ComponentType<P>>;
  render?: IRenderType<P, R>;
}

class AppRoute<P, R extends RouteProps> {
  readonly path: string;
  readonly title: string;
  readonly label: string;
  readonly exact: boolean;
  readonly isAsync: boolean;
  readonly Component?: React.ComponentType<P>;
  readonly getComponent?: () => Promise<React.ComponentType<P>>;
  readonly render: IRenderType<P, R>;

  constructor({ path, title, label, exact, isAsync, Component, getComponent, render}: IAppRouteProps<P, R>) {
    this.path = path;
    this.title = title;
    this.label = label;
    this.exact = exact;
    this.isAsync = isAsync;
    this.Component = Component;
    this.getComponent = getComponent;
    this.render = render ? render : ({ Component }) => <Component />;
  }

  getRouterRoute = () => {
    return <Route 
      render={this.isAsync ? this.renderAsyncComponent : this.renderSyncComponent} 
      exact={this.exact}
      path={this.path}
      key={this.path}
    />;
  }

  renderAsyncComponent = (route: RouteComponentProps<R>) => {
    return (
      <LazyRoute<P, R> 
        route={route}
        getComponent={this.getComponent!}
        renderComponent={this.render}
      />
    );
  }

  renderSyncComponent = (route: RouteComponentProps<R>) => {
    return this.render({
      Component: this.Component!,
      route
    });
  }
}

export interface ISyncRouteProps<P, R> extends Omit<IAppRouteProps<P,R>, 'getComponent' | 'isAsync' > {
  Component: React.ComponentType<P>; 
}
export class SyncRoute<P, R> extends AppRoute<P, R> {
  constructor(props: ISyncRouteProps<P, R>) {
    super({
      isAsync: false,
      ...props
    });
  }
}

export interface IAsyncRouteProps<P, R> extends Omit<IAppRouteProps<P,R>, 'Component' | 'isAsync' > {
  getComponent: () => Promise<React.ComponentType<P>>;
}
export class AsyncRoute<P, R> extends AppRoute<P, R> {
  constructor(props: IAsyncRouteProps<P, R>) {
    super({
      isAsync: true,
      ...props
    });
  }
}