import { classy } from '@audentio/utils/src/classy';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';
import React from 'react';
import { Popover } from '../Popover';
import style from './InputLabel.scss';

interface InputLabelProps extends React.HTMLProps<HTMLDivElement> {
    label?: string;
    help?: any;
    onClick?: () => void;
    disabled?: boolean;
}

export function InputLabel(props: InputLabelProps) {
    const { label, help, disabled, onClick, className, ...rest } = props;

    if (!label) return null;

    return (
        <div className={classy(style.labelContainer, disabled && style.disabled, className)} {...rest}>
            <span onClick={onClick} className={style.label}>
                {label}
            </span>

            {help && (
                <Popover position="top" className={style.popover} content={help}>
                    <span>
                        <HelpCircleIcon className={style.helpTrigger} />
                    </span>
                </Popover>
            )}
        </div>
    );
}
