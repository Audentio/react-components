import React, { Component } from 'react';
export interface MousemoveGlowProps {
    children: React.ReactElement<any>;
    disabled?: boolean;
}
export declare class MousemoveGlow extends Component<MousemoveGlowProps> {
    __container: HTMLElement;
    __centerGlow: HTMLElement;
    __wideGlow: HTMLElement;
    componentDidMount(): void;
    private mouseEnter;
    private mouseLeave;
    private mouseMove;
    render(): React.ReactNode;
}
