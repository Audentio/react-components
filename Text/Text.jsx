import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import tinycolor from 'tinycolor2';
import style from './Text.scss';
export function Text(props) {
    const { weight, size, block, children, italics, dynamicBg, color, style: inlineStyle, className, ...rest } = props;
    let dynamicTextColor;
    if (dynamicBg) {
        const _color = tinycolor(dynamicBg);
        if (_color.isLight()) {
            dynamicTextColor = 'rgba(0, 0, 0, 0.8)';
        }
        else {
            dynamicTextColor = 'white';
        }
    }
    return (<span {...rest} className={classy(style.text, weight && style[`weight__${weight}`], size && style[`size__${size}`], color && style[`color__${color}`], block && style.block, italics && style.italics, className)} style={{ color: dynamicTextColor, ...inlineStyle }}>
            {children}
        </span>);
}
//# sourceMappingURL=Text.jsx.map