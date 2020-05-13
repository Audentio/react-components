type OverlayTriggerActions = 'hover' | 'click';

export interface OverlayTriggerProps {
    /**
     * Single react component/element
     */
    children: any; // React.ReactChild,

    /**
     * Overlay content
     */
    overlay: React.ReactNode;

    /**
     * If passed, visibility is controlled by parent
     */
    visible?: boolean;

    /**
     * Set true if trigger position is fixed
     * this will make the overlay fixed as well to sync position onscroll
     */
    fixed?: boolean;

    /**
     * fired when visibility changes
     */
    onChange?: (visible: boolean) => void;

    /**
     * events that trigger overlay
     * e.g. trigger="click" or trigger=["click", "focus"]
     */
    trigger?: OverlayTriggerActions | Array<OverlayTriggerActions>;

    /**
     * overlay position
     */
    position?: 'top' | 'right' | 'bottom' | 'left';

    // should the overlay hide on click outside itself
    hideOnOutsideClick?: boolean;

    // overlay will hide this many millseconds without hover
    // if mouse is kept on popover/trigger, timer resets
    // only enabled if a number is passed (0 = hide on mouseleave on trigger)
    autoHide?: number | false;

    triggerStyle?: React.CSSProperties;
}

export interface OverlayTriggerState {
    visible: boolean;
    containerStyle: React.CSSProperties;
}
