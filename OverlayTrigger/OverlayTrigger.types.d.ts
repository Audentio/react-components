/// <reference types="react" />
declare type OverlayTriggerActions = 'hover' | 'click';
export interface OverlayTriggerProps {
    /**
     * Single react component/element
     */
    children: any;
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
    hideOnOutsideClick?: boolean;
    autoHide?: number | false;
}
export interface OverlayTriggerState {
    visible: boolean;
    containerStyle: React.CSSProperties;
}
export {};
