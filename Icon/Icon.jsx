import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './Icon.scss';
import { iconmap } from './mdi/map';
export const Icon = React.forwardRef((props, ref) => {
    const { size, children, name, className, fallback, onClick, ...rest } = props;
    const inlineStyle = { ...props.style };
    if (size)
        inlineStyle.fontSize = size;
    if (!iconmap[name] && __DEV__) {
        console.warn(name + ' missing in iconmap');
    }
    return (<i ref={ref} aria-hidden="true" className={classy(style.icon, className)} style={inlineStyle} onClick={onClick} {...rest}>
            {iconmap[name] || iconmap[fallback]}
        </i>);
});
//# sourceMappingURL=Icon.jsx.map