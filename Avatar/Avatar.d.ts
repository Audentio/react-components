import React, { Component } from 'react';
export interface AvatarProps {
    entity: {
        [key: string]: any;
    };
    /**
     * Avatar size
     */
    size?: 'lg' | 'md' | 'sm' | 'xs' | 'us' | 'stretch';
    className?: string;
    /**
     * Custom href. pass false to disable default href and render unlinked avatar
     */
    href?: string | boolean;
    getEntityHref?: any;
    onClick?: React.MouseEventHandler;
    /**
     * Render round avatar
     */
    round?: boolean;
    outline?: boolean;
    border?: boolean;
    title?: string;
}
/**
 * Recommended: Pass viewer/org/user as entity
 */
export declare class Avatar extends Component<AvatarProps> {
    static defaultProps: {
        size: string;
        round: boolean;
    };
    getEntityAbbreviation(entity: any): any;
    getEntityImage(entity: any): any;
    getAbbrFontSize(size: string, abbr?: string): number;
    getEntityColors(entity: any, image: any): React.CSSProperties;
    render(): React.ReactNode;
}
