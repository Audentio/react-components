import React, { Component } from 'react';
interface ErrorBoundryProps {
    /**
     * Render custom error
     */
    renderError?: (error: Error) => React.ReactChild;
}
export declare class ErrorBoundry extends Component<ErrorBoundryProps> {
    state: {
        error: Error;
    };
    componentDidUpdate(): void;
    componentDidCatch(error: any): void;
    render(): React.ReactNode;
}
export {};
