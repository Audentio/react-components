import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './Progress.scss';

interface Props {
    value: number;
    max?: number;
    stroke?: number;
    kind?: string;
    className?: string;
    indeterminate?: boolean;
    progressColor?: string;
    trackColor?: string;
}

export class Progress extends Component<Props> {
    static defaultProps = {
        value: -1,
        max: 100,
    };

    getScale() {
        const progress = this.props.value < 0 ? 0 : this.props.value;
        // const scale = progress / this.props.max;

        return {
            // transform: `scaleX(${scale})`,
            width: `${(progress / this.props.max) * 100}%`,
        };
    }

    public render(): React.ReactNode {
        const { kind, stroke, indeterminate, className, progressColor, trackColor } = this.props;
        const trackStyle: { [key: string]: any } = {};

        if (stroke > 0) trackStyle.height = stroke;
        if (trackColor) trackStyle.backgroundColor = trackColor;

        return (
            <div
                style={trackStyle}
                className={classy(
                    style.progressContainer,
                    kind && style[kind],
                    indeterminate && style.indeterminate,
                    className
                )}
            >
                <div
                    className={style.progress}
                    style={Object.assign(this.getScale(), { backgroundColor: progressColor })}
                />
            </div>
        );
    }
}
