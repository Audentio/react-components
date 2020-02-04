import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import style from './Backdrop.scss';
export class Backdrop extends Component {
    render() {
        const { children, className } = this.props;
        return (<div onClick={this.props.onClick} style={this.props.style} className={classy(style.backdrop, className)}>
                {children}
            </div>);
    }
}
//# sourceMappingURL=Backdrop.jsx.map