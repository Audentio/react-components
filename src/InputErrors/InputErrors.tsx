import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './InputErrors.scss';

interface InputErrorsProps {
    errors?: Array<string>;
    onClick?: () => void;
    className?: string;
}

export function InputErrors(props: InputErrorsProps) {
    const { errors = [], onClick, className } = props;

    if (!errors) return null;

    return (
        <div onClick={onClick} className={classy(style.error, errors.length > 0 && style.error_visible, className)}>
            <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </div>
    );
}
