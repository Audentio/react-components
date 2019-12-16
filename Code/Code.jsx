import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './Code.scss';
export function Code(props) {
    return <code className={classy(style.code, props.className)}>{props.children}</code>;
}
//# sourceMappingURL=Code.jsx.map