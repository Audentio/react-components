import * as Sentry from '@sentry/minimal';
import React, { Component } from 'react';

interface ErrorBoundryProps {
    /**
     * Render custom error
     */
    renderError?: (error: Error) => React.ReactChild;
}

export class ErrorBoundry extends Component<ErrorBoundryProps> {
    state: { error: Error } = {
        error: null,
    };

    componentDidUpdate() {
        this.state.error = null;
    }

    componentDidCatch(error) {
        if (__DEV__) {
            console.error(error);
        } else {
            console.log(error);
        }

        Sentry.captureException(error);

        this.setState({
            error,
        });
    }

    public render(): React.ReactNode {
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
