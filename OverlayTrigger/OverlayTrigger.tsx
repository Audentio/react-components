import { isTouch } from '@audentio/utils/src/isTouch';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { OverlayTriggerProps, OverlayTriggerState } from './OverlayTrigger.types';

export class OverlayTrigger extends Component<OverlayTriggerProps> {
    __trigger: HTMLElement;

    _autoHideTimer: NodeJS.Timer;

    __overlay: HTMLElement;

    __overlayNode: HTMLElement;

    static getDerivedStateFromProps(nextProps: OverlayTriggerProps, prevState: OverlayTriggerState) {
        // if value is passed we need to update local state to use it
        if (typeof nextProps.visible === 'boolean') {
            return {
                visible: nextProps.visible,
            };
        }

        return {};
    }

    static defaultProps = {
        trigger: 'click',
        position: 'bottom',
    };

    state: OverlayTriggerState = {
        visible: false,
        containerStyle: {},
    };

    /**
     * Cleanup
     */
    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.onBodyClick);

        if (this.__overlayNode) {
            document.body.removeChild(this.__overlayNode);
        }

        if (this.__trigger) {
            this.__trigger.removeEventListener('mouseleave', this.startAutohideTimer);
            this.__trigger.removeEventListener('mouseenter', this.stopAutohideTimer);
            this.__trigger.removeEventListener('mouseenter', this.show);
            this.__trigger.removeEventListener('click', this.toggle);
            this.__trigger.removeEventListener('mouseleave', this.hide);
        }

        if (this.__overlay) {
            this.__overlay.removeEventListener('mouseenter', this.stopAutohideTimer);
            this.__overlay.removeEventListener('mouseleave', this.startAutohideTimer);
        }
    }

    childMount = (ref: HTMLElement) => {
        if (!this.__trigger) {
            this.__trigger = ref;

            if (this.hasTrigger('hover')) {
                this.__trigger.addEventListener('mouseenter', this.show);
            }

            if (this.hasTrigger('click')) {
                this.__trigger.addEventListener('click', this.toggle);
            }

            // autohide 0 (hide immediately on mouseleave)
            if (this.props.autoHide === 0) {
                this.__trigger.addEventListener('mouseleave', this.hide);
            }

            // this.setState({
            //     containerStyle: this.getContainerStyle(this.__trigger),
            // });
        }
    };

    overlayMount = (ref: HTMLElement) => {
        if (this.__overlay !== ref) {
            this.__overlay = ref;

            if (ref) {
                this.__overlay.addEventListener('mouseenter', this.stopAutohideTimer);
                this.__overlay.addEventListener('mouseleave', this.startAutohideTimer);
            }
        }
    };

    getContainerStyle(elm: HTMLElement) {
        const { position, fixed } = this.props;

        const bcr = elm.getBoundingClientRect();

        const style: React.CSSProperties = {
            position: fixed ? 'fixed' : 'absolute',
            width: bcr.width,
            height: bcr.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const top = bcr.top + (fixed ? 0 : window.scrollY);

        if (position === 'top') {
            style.top = top - bcr.height;
            style.left = bcr.left;
        }

        if (position === 'right') {
            style.top = top;
            style.left = bcr.left + bcr.width;
        }

        if (position === 'left') {
            style.top = top;
            style.left = bcr.left - bcr.width;
        }

        if (position === 'bottom') {
            style.top = top + bcr.height;
            style.left = bcr.left;
        }

        return style;
    }

    show = () => {
        // Add Autohide listeners
        this.__trigger.addEventListener('mouseleave', this.startAutohideTimer);
        this.__trigger.addEventListener('mouseenter', this.stopAutohideTimer);

        const { hideOnOutsideClick, onChange } = this.props;
        const visible = true;

        if (hideOnOutsideClick) {
            document.body.addEventListener('mousedown', this.onBodyClick);
        }

        if (onChange) {
            this.setState({
                containerStyle: this.getContainerStyle(this.__trigger),
            });

            onChange(visible);
        } else {
            this.setState({
                visible,
                containerStyle: this.getContainerStyle(this.__trigger),
            });
        }
    };

    hide = () => {
        // Remove Autohide listeners
        this.__trigger.removeEventListener('mouseleave', this.startAutohideTimer);
        this.__trigger.removeEventListener('mouseenter', this.stopAutohideTimer);

        const { hideOnOutsideClick, onChange } = this.props;
        const visible = false;

        if (hideOnOutsideClick) {
            document.body.removeEventListener('mousedown', this.onBodyClick);
        }

        if (onChange) {
            onChange(visible);
        } else {
            this.setState({
                visible,
            });
        }
    };

    onBodyClick = (e: MouseEvent) => {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }

        // check if clicked on trigger
        if (this.__trigger && (e.target === this.__trigger || this.__trigger.contains(e.target))) {
            return;
        }

        if (this.__overlay && (e.target === this.__overlay || this.__overlay.contains(e.target))) {
            return;
        }

        e.preventDefault();
        this.hide();
    };

    startAutohideTimer = () => {
        const { autoHide } = this.props;

        if (!autoHide) return;

        this._autoHideTimer = setTimeout(this.hide, autoHide);
    };

    stopAutohideTimer = () => {
        if (this._autoHideTimer) {
            clearTimeout(this._autoHideTimer);
        }
    };

    toggle = () => {
        if (this.state.visible) {
            this.hide();
        } else {
            this.show();
        }
    };

    hasTrigger = triggerName => {
        const { trigger } = this.props;

        if (typeof trigger === 'object') {
            return trigger.indexOf(triggerName) > -1;
        }

        return trigger === triggerName;
    };

    /**
     * Create a mount node for overlay
     * re-use if it already exists
     */
    getOverlayNode() {
        if (this.__overlayNode) return this.__overlayNode;

        this.__overlayNode = document.createElement('div');

        document.body.appendChild(this.__overlayNode);

        return this.__overlayNode;
    }

    renderTarget() {
        const { children } = this.props;
        let child = children;

        if (children.constructor === Array) {
            if (children.length > 1) {
                throw new Error('OverlayTrigger expects a single child');
            }

            child = children[0];
        }

        if (typeof child.type === 'function') {
            // Components
            return React.cloneElement(child, {
                innerRef: this.childMount,
            });
        }

        // elements
        return React.cloneElement(child, {
            ref: this.childMount,
        });
    }

    render() {
        const { overlay, trigger } = this.props;
        const { visible, containerStyle } = this.state;

        if (trigger === 'hover' && isTouch()) {
            // render target as-is for hover overlays on touch devices
            return this.props.children;
        }

        return (
            <Fragment>
                {/* Render overlay */}
                {visible &&
                    ReactDOM.createPortal(
                        <div ref={this.overlayMount} style={containerStyle}>
                            {overlay}
                        </div>,
                        this.getOverlayNode()
                    )}

                {this.renderTarget()}
            </Fragment>
        );
    }
}
