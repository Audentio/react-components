import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './style.scss';

interface ParagraphProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    color?: 'content' | 'secondary' | 'faint';
    noMargin?: boolean;
}

export function Paragraph(props: ParagraphProps) {
    const { children, size, noMargin, color, ...rest } = props;

    const className = classy(
        style.paragraph,
        color && style['paragraph--' + color],
        size && style['paragraph--' + size],
        props.className
    );

    return (
        <p {...rest} className={classy(className, noMargin && style.noMargin)}>
            {children}
        </p>
    );
}
