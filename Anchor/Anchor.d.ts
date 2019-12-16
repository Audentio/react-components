import React, { Component } from 'react';
import { NavLinkProps } from 'react-router-dom';
export interface AnchorProps extends Omit<NavLinkProps, 'to'> {
    /**
     * Local pathname or external URI
     */
    href: string;
    title?: string;
    className?: string;
    style?: {
        [key: string]: any;
    };
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
}
/**
 * Anchor component (internal and external links)
 */
export declare class Anchor extends Component<AnchorProps> {
    static defaultProps: {
        href: string;
    };
    componentDidMount(): void;
    getHref(): string;
    render(): React.ReactNode;
}
