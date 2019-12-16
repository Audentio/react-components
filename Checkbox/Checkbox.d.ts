import React, { Component } from 'react';
import { BaseInputProps } from '../Input';
export interface renderArgs {
    checked: boolean;
    toggle: (e: any) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    errors?: Array<string>;
    disabled?: boolean;
}
export interface CheckboxProps extends BaseInputProps {
    value?: boolean;
    initialValue?: boolean;
    kind?: string;
    label?: string | React.ReactNode;
    className?: string;
    color?: string;
    block?: boolean;
    values?: {
        true: any;
        false: any;
    };
    /**
     * Custom render function
     * make your own checkbox component
     */
    render?: (renderArgs: renderArgs) => React.ReactNode;
}
export declare class Checkbox extends Component<CheckboxProps> {
    __checkbox: HTMLDivElement;
    static defaultProps: {
        values: {
            true: boolean;
            false: boolean;
        };
    };
    private toggle;
    private onKeyDown;
    private removeFocus;
    private saveRef;
    render(): React.ReactNode;
}
