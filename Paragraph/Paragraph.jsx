import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './style.scss';
export function Paragraph(props) {
    const { children, size, noMargin, color, ...rest } = props;
    const className = classy(style.paragraph, color && style['paragraph--' + color], size && style['paragraph--' + size], props.className);
    return (<p {...rest} className={classy(className, noMargin && style.noMargin)}>
            {children}
        </p>);
}
//# sourceMappingURL=Paragraph.jsx.map