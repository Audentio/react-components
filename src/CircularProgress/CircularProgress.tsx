import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './CircularProgress.scss';

export interface CircularProgressProps {
    /**
     * Circle size. pass number for px values
     * string for other units (5em, 50%, etc)
     */
    size?: number | string;

    /** Stroke width (percentage, relative to circle size) */
    stroke?: number;

    /** The shape to be used at the end of the progress bar */
    strokeLineCap?: 'butt' | 'square' | 'round';

    /**
     * Track width (percentage, relative to circle size)
     * inherits strokeWidth if not passed
     */
    trackWidth?: number;

    /**
     * Progress value. Doesn't have to be a percentage
     * (pass `max` for non-percentage values)
     */
    value?: number;

    /**
     * Upper bound for your value. (used to calculate percentage)
     * e.g. value={30} max={60} will render 50% progress
     */
    max?: number;

    className?: string;

    /** the gap degree of half circle, 0 - 360 */
    gapDegree?: number;

    gapPosition?: 'top' | 'bottom' | 'left' | 'right';

    kind?: 'primary' | 'danger' | 'success' | 'warning' | 'disabled';

    /** Indeterminate progress (animated) */
    indeterminate?: boolean;

    trackClass?: string;
    strokeClass?: string;
}

export class CircularProgress extends Component<CircularProgressProps> {
    static defaultProps = {
        size: 20,
        stroke: 10,
        value: 0,
        gapDegree: 0,
        strokeLinecap: 'round',
    };

    getPathStyles() {
        const { value, stroke, gapDegree, gapPosition } = this.props;

        const radius = 50 - stroke / 2;
        let beginPositionX = 0;
        let beginPositionY = -radius;
        let endPositionX = 0;
        let endPositionY = -2 * radius;
        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = 2 * radius;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = -2 * radius;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = 2 * radius;
                break;
            default:
        }
        const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
        const len = Math.PI * 2 * radius;
        const trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
        };
        const strokePathStyle = {
            strokeDasharray: `${(value / 100) * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition:
                'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
        };
        return { pathString, trailPathStyle, strokePathStyle };
    }

    public render(): React.ReactNode {
        const {
            value,
            kind,
            indeterminate,
            size,
            stroke,
            className,
            strokeLineCap,
            gapDegree,
            trackClass,
            strokeClass,
            ...props
        } = this.props;
        const trackWidth = this.props.trackWidth || stroke;

        const { pathString, trailPathStyle, strokePathStyle } = this.getPathStyles();

        return (
            <svg
                className={classy(
                    style.circle,
                    indeterminate && style.circle__indeterminate,
                    kind && style[kind],
                    className
                )}
                viewBox="0 0 100 100"
                style={{
                    width: size,
                }}
                {...props}
            >
                <path
                    className={classy(style.circle_track, trackClass)}
                    d={pathString}
                    stroke="grey"
                    strokeWidth={trackWidth || stroke}
                    fillOpacity="0"
                    style={trailPathStyle}
                />
                <path
                    className={classy(style.circle_stroke, strokeClass)}
                    d={pathString}
                    strokeLinecap={strokeLineCap}
                    stroke="blue"
                    strokeWidth={value === 0 ? 0 : stroke}
                    fillOpacity="0"
                    style={strokePathStyle}
                />
            </svg>
        );
    }
}
