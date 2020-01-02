import React from 'react';
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
    position?: 'top' | 'bottom' | 'left' | 'right';
    kind?: 'primary' | 'danger' | 'success' | 'warning';
    className?: string;
    /** Disable tooltip */
    disabled?: boolean;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
