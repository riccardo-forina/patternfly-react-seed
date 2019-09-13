import * as React from 'react';
import { PageSection, Alert } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import { useDocumentTitle } from './useDocumentTitle';
import { Route } from 'react-router';

const NotFound: React.FC = () => (
  <PageSection>
    <Alert variant="danger" title="404! This view hasn't been created yet." /><br />
    <NavLink to="/" className="pf-c-nav__link">Take me home</NavLink>
  </PageSection>
);

export const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
}