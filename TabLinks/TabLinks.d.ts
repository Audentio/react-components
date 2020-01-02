import React, { Component } from 'react';
import { AnchorProps } from '../Anchor';
export interface TabLinkProps {
    children: React.ReactNode;
    forceActive?: boolean;
    count?: number;
}
export interface TabLinksProps {
    className?: string;
    location?: any;
    staticContext?: any;
}
export declare class TabLinks extends Component<TabLinksProps & React.Props<HTMLUListElement>> {
    static Link: ({ className, activeClassName, href, count, forceActive, children, ...props }: AnchorProps & TabLinkProps) => JSX.Element;
    componentDidMount(): void;
    __tabLinks: React.RefObject<unknown>;
    render(): React.ReactNode;
}
