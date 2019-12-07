import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import { OverlayTrigger } from '../OverlayTrigger';
import style from './Tooltip.scss';

export interface TooltipProps {
    /**
     * The content of the tooltip
     */
    content: React.ReactNode;

    /**
     * A single element, either Component or DOM node
     */
    children: React.ReactChild;

    /**
     * Time in milliseconds to wait before hiding the tooltip. Defaults to 200.
     */
    delay?: number;

    /**
     * Where the tooltip should appear relative to its target.
     * If set to 'mouse', tooltip will display next to the mouse instead.
     */
    position?: 'top' | 'bottom' | 'left' | 'right'; //  | 'mouse',

    kind?: 'primary' | 'danger' | 'success' | 'warning';

    className?: string;

    /** Disable tooltip */
    disabled?: boolean;
}

export function Tooltip(props: TooltipProps) {
    const { children, content, kind, position = 'top', delay = 0, disabled, className } = props;

    if (disabled) return <>children</>;

    return (
        <OverlayTrigger
            trigger="hover"
            position={position}
            autoHide={delay}
            overlay={
                <div className={classy(style.container, style[`container__position_${position}`])}>
                    <div className={classy(style.tooltip, kind && style[`tooltip__${kind}`], className)}>
                        <span className={style.tooltip_text}>{content}</span>
                    </div>
                </div>
            }
        >
            {children}
        </OverlayTrigger>
    );
}
