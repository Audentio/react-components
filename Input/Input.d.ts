import React, { Component } from 'react';
import { Schema } from 'yup';
import { IconType } from '../Icon';
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
    onChange?: (d: {
        name: string;
        value: any;
    }) => void;
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
    onKeyPress?: (d: {
        name: string;
        value: any;
    }) => void;
}
interface State {
    focus: boolean;
    color: string;
}
export declare class Input extends Component<InputProps, State> {
    static defaultProps: {
        value: string;
    };
    state: State;
    private __inputRef;
    private getPlaceholder;
    private onChange;
    /**
     * iOS autofill doesnt trigger onChange but does trigger onFocus
     * we'll trigger onChange manually when that happens if input doesn't already have a value
     */
    private onFocus;
    private onBlur;
    private focus;
    render(): React.ReactNode;
}
export {};
