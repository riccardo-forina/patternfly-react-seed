import * as React from 'react';
import { accessibleRouteChangeHandler } from '@app/utils/utils';

interface IDynamicImportProps<P> {
  load: () => Promise<React.ComponentType<P>>;
  children: (component: React.ComponentType<P> | null) => any;
  focusContentAfterMount: boolean;
}

interface IDynamicImportState<P> {
  component: React.ComponentType<P> | null;
}

class DynamicImport<P> extends React.Component<IDynamicImportProps<P>, IDynamicImportState<P>> {
  public state = {
    component: null
  };
  private routeFocusTimer: number;
  constructor(props) {
    super(props);
    this.routeFocusTimer = 0;
  }
  public componentWillUnmount() {
    window.clearTimeout(this.routeFocusTimer);
  }
  public componentDidMount() {
    this.props
      .load()
      .then(component => {
        if (component) {
          this.setState({
            component: component
          });
        }
      })
      .then(() => {
        if (this.props.focusContentAfterMount) {
          this.routeFocusTimer = accessibleRouteChangeHandler();
        }
      });
  }
  public render() {
    return this.props.children(this.state.component);
  }
}

export { DynamicImport };
