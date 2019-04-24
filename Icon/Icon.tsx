import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './Icon.scss';
import { iconmap, iconType as mdiIconType } from './mdi/map';

export type IconType = mdiIconType;

export interface IconProps extends Omit<React.HTMLProps<HTMLElement>, 'size'> {
    /**
     * MDI Icon name (hyphenated)
     * https://materialdesignicons.com/
     */
    name: IconType;

    /**
     * fallback icon in case primary icon isn't in iconmap
     */
    fallback?: IconType;

    /**
     * Icon size (in px or other units)
     * assumes px unit if number is passed
     */
    size?: string | number;

    className?: string;
    style?: { [key: string]: any };

    innerRef?: (e: HTMLElement) => void;

    onClick?: (e: any) => void;
}

export function Icon(props: IconProps) {
    const { size, children, name, className, innerRef, fallback, onClick, ...rest } = props;

    const inlineStyle = { ...props.style };
    if (size) inlineStyle.fontSize = size;

    if (!iconmap[name]) {
        console.warn(name + ' missing in iconmap');
    }

    return (
        <i {...rest} ref={innerRef} className={classy(style.icon, className)} style={inlineStyle} onClick={onClick}>
            {iconmap[name] || iconmap[fallback]}
        </i>
    );
}
