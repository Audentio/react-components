import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './ContentWrap.scss';

interface ContentWrapProps {
    className?: string;
    children: React.ReactNode;

    // will render flex box with flex:1
    flex?: boolean;

    // narrow content (generally readable content)
    narrow?: boolean;
}

export function ContentWrap(props: ContentWrapProps) {
    const { flex, className, narrow, ...rest } = props;

    return (
        <div
            {...rest}
            className={classy(
                'contentWrap',
                style.contentWrap,
                flex && style.contentWrap__flex,
                narrow && style.contentWrap__narrow,
                className
            )}
        />
    );
}
