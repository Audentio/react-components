import React from 'react';
export declare type HeadingKind = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export interface HeadingProps {
    className?: string;
    children: React.ReactNode;
    color?: string;
    weight?: string;
    style?: {
        [key: string]: string;
    };
    inlineStyle?: string;
    kind: HeadingKind;
    margin?: boolean;
    noMargin?: boolean;
}
export declare function Heading(props: HeadingProps): JSX.Element;
