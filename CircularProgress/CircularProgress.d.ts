import React, { Component } from 'react';
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
    kind?: 'primary' | 'danger' | 'success' | 'warning' | 'disabled' | 'alt1' | 'alt2';
    /** Indeterminate progress (animated) */
    indeterminate?: boolean;
    trackClass?: string;
    strokeClass?: string;
}
export declare class CircularProgress extends Component<CircularProgressProps> {
    static defaultProps: {
        size: number;
        stroke: number;
        value: number;
        gapDegree: number;
        strokeLinecap: string;
    };
    getPathStyles(): {
        pathString: string;
        trailPathStyle: {
            strokeDasharray: string;
            strokeDashoffset: string;
            transition: string;
        };
        strokePathStyle: {
            strokeDasharray: string;
            strokeDashoffset: string;
            transition: string;
        };
    };
    render(): React.ReactNode;
}
