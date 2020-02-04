import * as Sentry from '@sentry/minimal';
import { Component } from 'react';
export class ErrorBoundry extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            error: null,
        };
    }
    componentDidUpdate() {
        this.state.error = null;
    }
    componentDidCatch(error) {
        if (__DEV__) {
            console.error(error);
        }
        else {
            console.log(error);
        }
        Sentry.captureException(error);
        this.setState({
            error,
        });
    }
    render() {
        const { children, renderError } = this.props;
        if (this.state.error) {
            if (renderError) {
                return renderError(this.state.error);
            }
            return null;
        }
        return children;
    }
}
//# sourceMappingURL=ErrorBoundry.jsx.map