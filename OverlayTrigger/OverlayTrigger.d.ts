/// <reference types="node" />
import React, { Component } from 'react';
import { OverlayTriggerProps, OverlayTriggerState } from './OverlayTrigger.types';
export declare class OverlayTrigger extends Component<OverlayTriggerProps> {
    __trigger: HTMLElement;
    _autoHideTimer: NodeJS.Timer;
    __overlay: HTMLElement;
    __overlayNode: HTMLElement;
    static getDerivedStateFromProps(nextProps: OverlayTriggerProps, prevState: OverlayTriggerState): {
        visible: boolean;
    } | {
        visible?: undefined;
    };
    static defaultProps: {
        trigger: string;
        position: string;
    };
    state: OverlayTriggerState;
    /**
     * Cleanup
     */
    componentWillUnmount(): void;
    private childMount;
    private overlayMount;
    private getContainerStyle;
    private show;
    private hide;
    private onBodyClick;
    private startAutohideTimer;
    private stopAutohideTimer;
    private toggle;
    private hasTrigger;
    /**
     * Create a mount node for overlay
     * re-use if it already exists
     */
    getOverlayNode(): HTMLElement;
    renderTarget(): React.FunctionComponentElement<{
        innerRef: (ref: HTMLElement) => void;
    }> | React.FunctionComponentElement<{
        ref: (ref: HTMLElement) => void;
    }>;
    render(): React.ReactNode;
}
