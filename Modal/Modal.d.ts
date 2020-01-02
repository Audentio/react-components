import React, { Component } from 'react';
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
export declare class Modal extends Component<ModalProps, ModalState> {
    _mountNode?: HTMLDivElement;
    state: ModalState;
    componentWillUnmount(): void;
    getMountNode(): HTMLDivElement;
    private onClick;
    private close;
    render(): React.ReactNode;
}
export {};
