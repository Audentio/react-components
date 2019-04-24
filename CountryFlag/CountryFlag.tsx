import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './CountryFlag.scss';

export interface CountryFlagProps {
    location: any;
    round?: boolean;
    size?: string;
    className?: string;
}

export function CountryFlag(props: CountryFlagProps) {
    const { className, round, location, size, ...rest } = props;
    const { country, country_shortcode } = location;
    if (!country_shortcode) return null;

    return (
        <img
            {...rest}
            className={classy(style.flag, round && style.round, size && style[`size__${size}`], className)}
            alt={country}
            src={`/assets/flags/${country_shortcode.toLowerCase()}.svg`}
        />
    );
}
