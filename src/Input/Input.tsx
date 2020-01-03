import { classy } from '@audentio/utils/src/classy';
import { passProps } from '@audentio/utils/src/passProps';
import { stylish } from '@audentio/utils/src/stylish';
import React, { Component } from 'react';
import { Schema } from 'yup';
import { Icon, IconType } from '../Icon';
import { InputErrors } from '../InputErrors';
import { InputLabel } from '../InputLabel';
import { Timestamp } from '../Timestamp';
import style from './Input.scss';

export interface BaseInputProps {
    name: string;
    disabled?: boolean;

    /**
     *
     * Validation schema
     * not used directly by input. <Form> uses it for validation
     */
    schema?: Schema<any>;

    /**
     * Validation errors
     * array of error messages
     */
    errors?: Array<string>;

    /**
     * Don't pass these directly. For value pass values to form and let it pass them down to inputs
     * Number value will not work consistently unless you pass type="number"
     */

    onChange?: (d: { name: string; value: any }) => void;
    onBlur?: Function;
    triggerFormUpdate?: Function;

    /**
     * Skip value in Form's onSubmit prop
     * this lets you use create inputs solely for dynamic fields
     */
    skipOnSubmit?: boolean;
}

export interface InputProps extends BaseInputProps {
    name: string;
    containerClass?: string;
    className?: string;
    isFetching?: boolean;
    block?: boolean;
    large?: boolean;
    icon?: IconType;
    label?: string;
    placeholder?: string;
    type?: string;
    style?: object;
    autoFocus?: boolean;
    spellCheck?: boolean;
    maxLength?: number;
    prefix?: any;
    size?: 'small' | 'large';
    skipDateFormat?: boolean;

    /**
     * HTML5 autocomplete attribute
     * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute
     */
    autoComplete?: string;

    /**
     * Markdown string explaining the input field's purpose/usage
     */
    help?: string;

    /** Passed by form. don't pass directly */
    value?: string | number;

    /**
     * Initial value inside a form
     *  - Number value will not work consistently unless you pass type="number"
     */
    initialValue?: string | number;
    onKeyPress?: (d: { name: string; value: any }) => void;
}

interface State {
    focus: boolean;
    color: string;
}

export class Input extends Component<InputProps, State> {
    public static defaultProps = {
        // empty string to make sure input is always rendered as controlled
        value: '',
    };

    public state: State = {
        focus: false,
        color: null,
    };

    private __inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    private getPlaceholder = (): string => this.props.placeholder;

    private onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, onChange } = this.props;

        onChange({ name, value: e.currentTarget.value });
    };

    /**
     * iOS autofill doesnt trigger onChange but does trigger onFocus
     * we'll trigger onChange manually when that happens if input doesn't already have a value
     */
    private onFocus = (e): void => {
        const { triggerFormUpdate, value } = this.props;

        // not needed if input has value
        if (value && typeof value === 'string' && value.length > 0) return;

        // not needed on non-touch
        if (!('ontouchstart' in window)) return;

        if (triggerFormUpdate) triggerFormUpdate();
    };

    private onBlur = (): void => {
        const { name, onBlur } = this.props;

        if (onBlur) onBlur({ name });
    };

    private focus = (): void => {
        if (this.__inputRef) {
            this.__inputRef.current.focus();
        }
    };

    public render(): React.ReactNode {
        const {
            value,
            prefix = null,
            label,
            isFetching,
            help,
            spellCheck,
            containerClass,
            className,
            type,
            disabled,
            block,
            large,
            size,
            icon,
            maxLength,
            autoFocus,
            autoComplete,
            errors,
            skipDateFormat,
            ...rest
        } = this.props;
        let { initialValue } = this.props;
        const { focus } = this.state;

        // Decide input tagname based on type
        const InputTag: any = type === 'textarea' ? 'textarea' : 'input';

        let hasColorInputSupport = null;
        if (type === 'color') {
            if (!initialValue) {
                initialValue = '#31385e';
            }
            hasColorInputSupport = (document): boolean => {
                try {
                    const input = document.createElement('input');
                    input.type = 'color';
                    input.value = '!';
                    return input.type === 'color' && input.value !== '!';
                } catch (e) {
                    return false;
                }
            };
        }

        let inputValue = value;
        if (type === 'datetime-local') {
            inputValue = Timestamp.format(value, 'yyyy-MM-ddTHH:mm');
        } else if (type === 'date') {
            inputValue = value;
        }

        return (
            <div
                className={classy(
                    className,
                    style.container,

                    type === 'textarea' && style.container__textarea,
                    size && style[`container__size__${size}`],
                    stylish(style, 'container', {
                        block,
                        disabled,
                        error: errors && errors.length,
                        focus,
                        isFetching,
                        large,
                    }),
                    containerClass,
                    icon && style.hasIcon
                )}
                style={this.props.style}
            >
                <InputLabel disabled={disabled} label={label} help={help} onClick={this.focus} />

                <div className={style.inputwrapper}>
                    {prefix}

                    {type === 'color' && !hasColorInputSupport ? (
                        <div className={style.nonNativeColor}>
                            <input
                                {...passProps(rest)}
                                style={{
                                    backgroundColor: this.state.color ? this.state.color : initialValue.toString(),
                                    cursor: 'pointer',
                                }}
                                ref={this.__inputRef}
                                disabled={disabled}
                                readOnly
                                onFocus={this.onFocus}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                className={style.input}
                                placeholder={this.getPlaceholder()}
                            />
                        </div>
                    ) : (
                        <InputTag
                            {...passProps(rest)}
                            ref={this.__inputRef}
                            type={type}
                            disabled={disabled}
                            autoComplete={autoComplete}
                            onFocus={this.onFocus}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            value={inputValue}
                            spellCheck={spellCheck}
                            maxLength={maxLength}
                            className={classy(style.input, type === 'textarea' && style.input__textarea)}
                            autoFocus={autoFocus}
                            placeholder={this.getPlaceholder()}
                        />
                    )}

                    {icon && <Icon name={icon} className={style.icon} />}
                </div>

                <InputErrors onClick={this.focus} errors={errors} />
            </div>
        );
    }
}
