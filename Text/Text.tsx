import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import tinycolor from 'tinycolor2';
import style from './Text.scss';

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

export function Text(props: TextProps) {
    const { weight, size, block, children, italics, dynamicBg, color, style: inlineStyle, className, ...rest } = props;

    let dynamicTextColor: string;
    if (dynamicBg) {
        const _color = tinycolor(dynamicBg);

        if (_color.isLight()) {
            dynamicTextColor = 'rgba(0, 0, 0, 0.8)';
        } else {
            dynamicTextColor = 'white';
        }
    }

    return (
        <span
            {...rest}
            className={classy(
                style.text,
                weight && style[`weight__${weight}`],
                size && style[`size__${size}`],
                color && style[`color__${color}`],
                block && style.block,
                italics && style.italics,
                className
            )}
            style={{ color: dynamicTextColor, ...inlineStyle }}
        >
            {children}
        </span>
    );
}
