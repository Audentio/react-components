import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './Backdrop.scss';

interface Props {
    onClick?: React.ReactEventHandler;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export class Backdrop extends Component<Props> {
    public render(): React.ReactNode {
        const { children, className } = this.props;

        return (
            <div onClick={this.props.onClick} style={this.props.style} className={classy(style.backdrop, className)}>
                {children}
            </div>
        );
    }
}
