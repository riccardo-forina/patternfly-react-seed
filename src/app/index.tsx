import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { AppRoute } from '@app/utils/AppRoute';
import { PageNotFound } from '@app/utils/PageNotFound';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { routes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <AppLayout>
      <LastLocationProvider>
        <Switch>
          { routes.map((route, idx) => route.getRouterRoute() )}
          <PageNotFound title={'404 Page Not Found'} />
        </Switch>
      </LastLocationProvider>
      </AppLayout>
    </Router>
  );
};

export { App };
