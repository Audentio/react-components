import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './InputGroup.scss';

export function InputGroup(props) {
    return <div className={classy('inputgroup', style.inputGroup)}>{props.children}</div>;
}
