import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import { OverlayTrigger } from '../OverlayTrigger';
import style from './Tooltip.scss';
export function Tooltip(props) {
    const { children, content, kind, position = 'top', delay = 0, disabled, className } = props;
    if (disabled)
        return <>children</>;
    return (<OverlayTrigger trigger="hover" position={position} autoHide={delay} overlay={<div className={classy(style.container, style[`container__position_${position}`])}>
                    <div className={classy(style.tooltip, kind && style[`tooltip__${kind}`], className)}>
                        <span className={style.tooltip_text}>{content}</span>
                    </div>
                </div>}>
            {children}
        </OverlayTrigger>);
}
//# sourceMappingURL=Tooltip.jsx.map