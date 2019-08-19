import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './style.scss';

export type HeadingKind = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
    className?: string;
    children: React.ReactNode;
    color?: string;
    weight?: string;
    style?: { [key: string]: string };
    inlineStyle?: string;
    kind: HeadingKind;
    margin?: boolean;
    noMargin?: boolean;
}

export function Heading(props: HeadingProps) {
    const { kind, margin, children, color, noMargin, weight, style: inlineStyle, ...rest } = props;

    const className = classy(
        style.heading,
        style['heading--' + kind],
        color && style['heading--' + color],
        margin && style['heading--fullMargin'],
        noMargin && style['heading--noMargin'],
        weight && style['heading--weight-' + weight],
        props.className
    );

    let Tagname: any = 'h1';
    Tagname = kind;

    return (
        <Tagname {...rest} style={inlineStyle} className={className}>
            {children}
        </Tagname>
    );
}
