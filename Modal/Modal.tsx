/* eslint-disable react/no-multi-comp */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from '../Overlay';
import ModalBox from './Box';

interface ModalProps {
    /**
     * show/hide modal. if passed, it renders a controlled Modal
     * not needed if you use `trigger` prop
     */
    visible?: boolean;

    /**
     * Modal content
     */
    children: React.ReactNode;

    className?: string;

    /**
     * callback fired when modal is closed. use it to set state false in your component
     * not needed if you use `trigger` prop
     */
    onClose?: () => void;

    /**
     * Single React child that accepts onClick prop, used as trigger
     * passing trigger tells Modal to manage its state automatically
     */
    trigger?: any;

    containerClass?: string;
    noOverlay?: boolean;
}

interface ModalState {
    visible?: boolean;
}

interface LightboxPortalProps {
    visible: boolean;
    mountNode: HTMLDivElement;
    onClose: (e: React.SyntheticEvent) => void;
    canClose?: boolean;
    children: React.ReactNode;
    className?: string;
    containerClass?: string;
    noOverlay?: boolean;
}

class LightboxPortal extends Component<LightboxPortalProps> {
    public render(): React.ReactNode {
        const { noOverlay, onClose, mountNode, className, visible, canClose, children, containerClass } = this.props;

        if (!visible) return null;

        const portal = ReactDOM.createPortal(
            <ModalBox containerClass={containerClass} className={className} canClose={canClose} onClose={onClose}>
                {children}
            </ModalBox>,
            mountNode
        );

        if (noOverlay) return portal;

        return <Overlay type="modal">{portal}</Overlay>;
    }
}

export class Modal extends Component<ModalProps, ModalState> {
    _mountNode?: HTMLDivElement;

    state: ModalState = {};

    public componentWillUnmount(): void {
        // destroy mount node
        if (this._mountNode) this._mountNode.remove();
    }

    getMountNode() {
        if (this._mountNode) return this._mountNode;

        this._mountNode = document.body.appendChild(document.createElement('div'));

        return this._mountNode;
    }

    private onClick = (e: React.SyntheticEvent): void => {
        const { visible } = this.props;

        e.preventDefault();

        if (typeof visible !== 'boolean') {
            this.setState({
                visible: true,
            });
        }
    };

    private close = (e: React.SyntheticEvent): void => {
        const { onClose, visible } = this.props;

        e.preventDefault();

        if (typeof visible !== 'boolean') {
            this.setState({
                visible: false,
            });
        }

        if (onClose) onClose();
    };

    public render(): React.ReactNode {
        const { visible, trigger, className, children, onClose, containerClass, noOverlay } = this.props;

        // use visible prop if it's a boolean
        // otherwise use internal state
        const isVisible = typeof visible === 'boolean' ? visible : this.state.visible;

        return (
            <Fragment>
                {/* render trigger if passed */}
                {trigger &&
                    React.cloneElement(React.Children.only(trigger), {
                        onClick: this.onClick,
                    })}

                {__BROWSER__ && (
                    <LightboxPortal
                        className={className}
                        onClose={this.close}
                        canClose={!!onClose}
                        mountNode={this.getMountNode()}
                        visible={isVisible}
                        containerClass={containerClass}
                        noOverlay={noOverlay}
                    >
                        {children}
                    </LightboxPortal>
                )}
            </Fragment>
        );
    }
}
