import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import { OverlayTrigger } from '../OverlayTrigger';
import style from './Popover.scss';

interface PopoverProps {
    content: (() => React.ReactNode) | (React.ReactChild);
    className?: string;
    containerClass?: string;

    /**
     * Where the popover should appear relative to its target.
     */
    position?: 'top' | 'bottom' | 'left' | 'right';

    /**
     * If passed, visibility is controlled by parent
     */
    visible?: boolean;

    /**
     * fired when visibility changes
     */
    onChange?: (visible: boolean) => void;

    autoHide?: number | false;
    innerRef?: any;
    trigger?: 'hover' | 'click';
    fixed?: boolean;

    children?: React.ReactChild;
}

export function Popover(props: PopoverProps) {
    const {
        children,
        content,
        innerRef,
        autoHide = 400,
        className,
        position = 'bottom',
        containerClass,
        ...rest
    } = props;

    return (
        <OverlayTrigger
            position={position}
            autoHide={autoHide}
            hideOnOutsideClick
            ref={innerRef}
            trigger="click"
            {...rest}
            overlay={
                <div className={classy(style.container, containerClass, style[`container__position_${position}`])}>
                    <div className={classy(style.popover, className)}>
                        {typeof content === 'function' ? content() : content}
                    </div>
                </div>
            }
        >
            {children}
        </OverlayTrigger>
    );
}
