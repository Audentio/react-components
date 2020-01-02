import React from 'react';
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
export declare function Popover(props: PopoverProps): JSX.Element;
export {};
