import React, { Component } from 'react';
import { RedirectProps as OriginalRedirectProps } from 'react-router-dom';
interface RedirectProps extends OriginalRedirectProps {
    /**
     * HTTP status code (used in SSR)
     */
    statusCode?: number;
    staticContext?: {
        externalPath?: string;
        action?: string;
        statusCode?: number;
    };
    to: string | {
        pathname: string;
    };
    history?: any;
    location?: any;
}
export declare class Redirect extends Component<RedirectProps> {
    static defaultProps: {
        statusCode: number;
    };
    render(): React.ReactNode;
}
export {};
