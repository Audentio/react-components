import { classy } from '@audentio/utils/src/classy';
import { keymap } from '@audentio/utils/src/keymap';
import React, { Component } from 'react';
import { Icon } from '../Icon';
import { BaseInputProps } from '../Input';
import { InputErrors } from '../InputErrors';
import { Text } from '../Text';
import style from './Checkbox.scss';

export interface renderArgs {
    checked: boolean;
    toggle: (e) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    errors?: Array<string>;
    disabled?: boolean;
}

export interface CheckboxProps extends BaseInputProps {
    value?: boolean;
    initialValue?: boolean;
    kind?: string;
    label?: string | React.ReactNode;
    className?: string;
    color?: string;

    /* override check/unchecked values (booleans by default) */
    values?: {
        true: any;
        false: any;
    };

    /**
     * Custom render function
     * make your own checkbox component
     */
    render?: (renderArgs: renderArgs) => React.ReactNode;
}

export class Checkbox extends Component<CheckboxProps> {
    __checkbox: HTMLDivElement;

    static defaultProps = {
        values: {
            true: true,
            false: false,
        },
    };

    toggle = e => {
        if (e.target && e.target.nodeName === 'A') {
            return;
        }

        const { name, value, onChange, disabled, values } = this.props;

        if (disabled) return;

        e.preventDefault();

        onChange({
            name,
            value: values[(!value).toString()],
        });
    };

    onKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === keymap.SPACE || e.keyCode === keymap.ENTER) {
            this.toggle(e);
        }
    };

    removeFocus = () => {
        // remove focus onClick
        if (this.__checkbox) {
            this.__checkbox.blur();
        }
    };

    saveRef = (ref: HTMLDivElement) => {
        this.__checkbox = ref;
    };

    public render(): React.ReactNode {
        const { value: checked, render, errors, kind, className, color, label, disabled } = this.props;

        // render function
        // for custom checkboxes (like switch)
        if (render) {
            return render({
                checked,
                disabled,
                errors,
                toggle: this.toggle,
                onKeyDown: this.onKeyDown,
            });
        }

        return (
            <div className={classy(style.container, disabled && style.container__disabled)} onClick={this.toggle}>
                <div
                    style={checked ? { backgroundColor: color } : {}}
                    onKeyDown={this.onKeyDown}
                    onClick={this.removeFocus}
                    tabIndex={!disabled ? 0 : undefined}
                    className={classy(
                        style.checkbox,
                        kind && style[`checkbox__${kind}`],
                        checked && style.checked,
                        className
                    )}
                    ref={this.saveRef}
                >
                    <Text dynamicBg={color}>
                        <Icon name="check" />
                    </Text>
                </div>

                {label && <div className={style.label}>{label}</div>}

                <InputErrors className={style.errors} errors={errors} />
            </div>
        );
    }
}
