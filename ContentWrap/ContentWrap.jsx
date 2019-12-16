import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './ContentWrap.scss';
export function ContentWrap(props) {
    const { flex, className, narrow, ...rest } = props;
    return (<div {...rest} className={classy('contentWrap', style.contentWrap, flex && style.contentWrap__flex, narrow && style.contentWrap__narrow, className)}/>);
}
//# sourceMappingURL=ContentWrap.jsx.map