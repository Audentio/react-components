import React from 'react';
import style from './Blockquote.scss';

export function Blockquote(props: { children?: React.ReactNode; cite?: string }) {
    const { children, cite } = props;

    return (
        <blockquote className={style.blockquote}>
            {children}{' '}
            {cite && (
                <footer>
                    – <cite>{cite}</cite>
                </footer>
            )}
        </blockquote>
    );
}
