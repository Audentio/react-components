import React, { Component } from 'react';
interface Props {
    onClick?: React.ReactEventHandler;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
export declare class Backdrop extends Component<Props> {
    render(): React.ReactNode;
}
export {};
