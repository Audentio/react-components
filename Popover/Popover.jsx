import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import { OverlayTrigger } from '../OverlayTrigger';
import style from './Popover.scss';
export function Popover(props) {
    const { children, content, innerRef, autoHide = 400, className, position = 'bottom', containerClass, ...rest } = props;
    return (<OverlayTrigger position={position} autoHide={autoHide} hideOnOutsideClick ref={innerRef} trigger="click" {...rest} overlay={<div className={classy(style.container, containerClass, style[`container__position_${position}`])}>
                    <div className={classy(style.popover, className)}>
                        {typeof content === 'function' ? content() : content}
                    </div>
                </div>}>
            {children}
        </OverlayTrigger>);
}
//# sourceMappingURL=Popover.jsx.map