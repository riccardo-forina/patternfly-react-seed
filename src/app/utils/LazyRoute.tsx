import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useLastLocation } from 'react-router-last-location';
import { DynamicImport } from '@app/DynamicImport';
import { PageSection, Alert } from '@patternfly/react-core';

export interface IMapProps<P, R> { 
  Component: React.ComponentType<P>; 
  route: RouteComponentProps<R> 
}

export interface ILazyRouteProps<P , R> {
  route: RouteComponentProps<R>;
  getComponent: () => Promise<React.ComponentType<P>>
  renderComponent: (props: IMapProps<P, R>) => any;
}

export function LazyRoute<P, R> ({ 
  route, 
  getComponent, 
  renderComponent,
}: React.PropsWithChildren<ILazyRouteProps<P, R>>) {
  const lastNavigation = useLastLocation();
  return (
    <DynamicImport load={getComponent} focusContentAfterMount={lastNavigation !== null}>
      {(Component) => {
        if (Component === null) {
          return (
            <PageSection aria-label="Loading Content Container">
              <div className="pf-l-bullseye">
                <Alert title="Loading" className="pf-l-bullseye__item" />
              </div>
            </PageSection>
          );
        } else {
          return renderComponent({ Component, route });
        }
      }}
    </DynamicImport>
  );
};