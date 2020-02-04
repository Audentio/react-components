import React, { Component } from 'react';
interface Props {
    value: number;
    max?: number;
    stroke?: number;
    kind?: string;
    className?: string;
    indeterminate?: boolean;
    progressColor?: string;
    trackColor?: string;
    progressGradient?: {
        from: string;
        to: string;
    };
}
export declare class Progress extends Component<Props> {
    static defaultProps: {
        value: number;
        max: number;
    };
    getScale(): {
        width: string;
    };
    render(): React.ReactNode;
}
export {};
