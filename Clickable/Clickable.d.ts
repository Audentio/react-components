import React, { Component } from 'react';
interface ClickableProps {
    onClick?: (e: any) => void;
    href: string;
    element?: any;
    history?: any;
    match?: any;
    location?: any;
    innerRef?: any;
    staticContext?: any;
}
export declare class Clickable extends Component<ClickableProps & React.HTMLProps<HTMLElement>> {
    static defaultProps: {
        element: string;
    };
    private onClick;
    render(): React.ReactNode;
}
export {};
