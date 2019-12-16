import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './style.scss';
export function Heading(props) {
    const { kind, margin, children, color, noMargin, weight, style: inlineStyle, ...rest } = props;
    const className = classy(style.heading, style['heading--' + kind], color && style['heading--' + color], margin && style['heading--fullMargin'], noMargin && style['heading--noMargin'], weight && style['heading--weight-' + weight], props.className);
    let Tagname = 'h1';
    Tagname = kind;
    return (<Tagname {...rest} style={inlineStyle} className={className}>
            {children}
        </Tagname>);
}
//# sourceMappingURL=Heading.jsx.map