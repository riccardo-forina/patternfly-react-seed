import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { PageNotFound } from '@app/utils/PageNotFound';
import { AppLayout } from '@app/AppLayout/AppLayout';
import '@app/app.css';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { IParameterizedProps } from './Parameterized/Parameterized';
import { AppRoute } from '@app/utils/AppRoute';

const getSupportComponent = async () => {
  const module = await import(/* webpackChunkName: 'support' */ '@app/Support/Support');
  return module.Support;
};

const getParameterizedComponent = async () => {
  const module = await import(/* webpackChunkName: 'parameterized' */ '@app/Parameterized/Parameterized');
  return module.Parameterized;
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <AppLayout>
        <LastLocationProvider>
          <Switch>
            <AppRoute path={'/'} exact={true} title={'Dashboard'} Component={Dashboard} />
            <AppRoute path={'/support'} exact={true} title={'Support'} getComponent={getSupportComponent} />
            <AppRoute<IParameterizedProps, { fooInTheUrl?: number }>
              path={'/parameterized/:fooInTheUrl?'}
              title={'Parametrized'}
              render={({ route, redirect }) => redirect(`${route.match.url}/nested/${route.match.params.fooInTheUrl}`)}
            >
              {path => (
                <Switch>
                  <AppRoute<IParameterizedProps, { fooInTheUrl?: number; barInTheUrl?: number }>
                    path={`${path}/nested/:barInTheUrl?`}
                    title={'Nested'}
                    getComponent={getParameterizedComponent}
                    render={({ Component, route }) => <Component param={route.match.params.barInTheUrl || 1} />}
                  />
                </Switch>
              )}
            </AppRoute>
            <PageNotFound title={'404 Page Not Found'} />
          </Switch>
        </LastLocationProvider>
      </AppLayout>
    </Router>
  );
};

export { App };
