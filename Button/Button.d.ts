import React, { Component } from 'react';
import { IconType } from '../Icon';
export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    kind?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    size?: 'large' | 'small' | 'xs';
    bg?: 'light' | 'dark';
    href?: string;
    icon?: IconType;
    iconPlacement?: 'left' | 'right';
    type?: 'button' | 'submit' | 'reset';
    weight?: 'normal' | 'semi' | 'bold';
    disabled?: boolean;
    onClick?: Function;
    isFetching?: boolean;
    alt?: boolean;
    border?: boolean;
    text?: boolean;
    dialog?: boolean;
    autoFocus?: boolean;
    disableGlow?: boolean;
    style?: any;
    name?: string;
    innerRef?: (r: HTMLElement) => void;
    block?: boolean;
}
export declare class Button extends Component<ButtonProps> {
    __btn: HTMLElement;
    static defaultProps: {
        type: string;
        iconPlacement: string;
    };
    componentDidMount(): void;
    private onClick;
    private removeFocus;
    render(): React.ReactNode;
}
