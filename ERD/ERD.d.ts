import React, { Component } from 'react';
interface ERDChild {
    bcr: ClientRect;
    width: number;
    height: number;
}
interface ERDProps {
    nodeName?: string;
    delay?: number;
    children: (args: ERDChild) => React.ReactNode;
    className?: string;
}
interface ERDState {
    bcr: ClientRect;
}
/**
 * Element Resize Detector
 * listen to width changes on conainer
 *
 * example: <ERD>{({ width }) => (<div>conditionally render here</div>)}</ERD>
 */
export declare class ERD extends Component<ERDProps, ERDState> {
    __element: HTMLElement;
    static defaultProps: {
        nodeName: string;
        delay: number;
    };
    state: ERDState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onElementResize;
    render(): React.ReactNode;
}
export {};
