import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './FormButtons.scss';

export function FormButtons({ children, className, ...rest }: React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={classy(style.actions, className)} {...rest}>
            {children}
        </div>
    );
}
