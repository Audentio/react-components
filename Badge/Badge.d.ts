import React, { Component } from 'react';
export declare class Badge extends Component<{
    children: number | string;
    size?: 'xs' | 'sm' | 'lg';
    kind?: string;
    className?: string;
    max?: number;
}> {
    static defaultProps: {
        max: number;
    };
    renderNumber(num: any): any;
    render(): React.ReactNode;
}
