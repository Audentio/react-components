import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './Progress.scss';
export class Progress extends Component {
    getScale() {
        const progress = this.props.value < 0 ? 0 : this.props.value;
        // const scale = progress / this.props.max;
        return {
            // transform: `scaleX(${scale})`,
            width: `${(progress / this.props.max) * 100}%`,
        };
    }
    render() {
        const { kind, stroke, indeterminate, className, progressColor, trackColor, progressGradient } = this.props;
        const trackStyle = {};
        if (stroke > 0)
            trackStyle.height = stroke;
        if (trackColor)
            trackStyle.backgroundColor = trackColor;
        return (<div style={trackStyle} className={classy(style.progressContainer, kind && style[kind], indeterminate && style.indeterminate, className)}>
                <div className={style.progress} style={Object.assign(this.getScale(), { backgroundColor: progressColor }, progressGradient && {
            backgroundImage: `linear-gradient(90deg, ${progressGradient.from}, ${progressGradient.to})`,
        })}/>
            </div>);
    }
}
Progress.defaultProps = {
    value: -1,
    max: 100,
};
//# sourceMappingURL=Progress.jsx.map