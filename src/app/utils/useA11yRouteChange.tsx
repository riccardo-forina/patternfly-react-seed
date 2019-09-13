import { useLastLocation } from 'react-router-last-location';
import * as React from 'react';
import { accessibleRouteChangeHandler } from '@app/utils/utils';

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
export const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    let routeFocusTimer: number;
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      if (routeFocusTimer) {
        clearTimeout(routeFocusTimer);
      }
    };
  }, [isAsync, lastNavigation]);
}