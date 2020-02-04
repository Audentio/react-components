import React from 'react';
interface TextProps {
    weight?: 'light' | 'semibold' | 'bold';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    color?: 'secondary' | 'faint' | 'emphasis';
    children: any;
    italics?: boolean;
    block?: boolean;
    /**
     * You can pass a color code and text color will be changed to look better on that background
     * useful for rendering text over unknown background colors
     */
    dynamicBg?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare function Text(props: TextProps): JSX.Element;
export {};
