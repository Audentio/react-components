import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './Badge.scss';

export class Badge extends Component<{
    children: number | string;
    size?: 'xs' | 'sm' | 'lg';
    kind?: string;
    className?: string;
    max?: number;
}> {
    static defaultProps = {
        max: Infinity,
    };

    renderNumber(num) {
        const { max } = this.props;

        if (num > max) return `${max}+`;
        return num;
    }

    render() {
        const { children, className, size, kind } = this.props;

        return (
            <span
                className={classy(
                    style.badge,
                    size && style[`size__${size}`],
                    kind && style[`kind__${kind}`],
                    className
                )}
            >
                {typeof children === 'number' ? this.renderNumber(children) : children}
            </span>
        );
    }
}
