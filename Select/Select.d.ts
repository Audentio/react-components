import React, { Component } from 'react';
import { Schema } from 'yup';
import { BaseInputProps } from '../Input';
export interface SelectProps extends Omit<BaseInputProps, 'schema'> {
    options?: Array<{
        value: any;
        label: string;
        options?: Array<{
            value: any;
            label: string;
        }>;
    }>;
    multi?: boolean;
    placeholder?: string;
    name: string;
    className?: string;
    size?: 'small' | 'large';
    label?: string;
    filterOption?: Function;
    formatOptionLabel?: Function;
    /**
     * Initial value inside a form
     *  - Number value will not work consistently unless you pass type="number"
     */
    initialValue?: string | number;
    /**
     * Help text
     * shown in tooltip
     */
    help?: string;
    block?: boolean;
    /**
     * Validation schema
     * not used directly by input. <Form> uses it for validation
     */
    schema?: Schema<any> | 'email' | 'date';
    isClearable?: boolean;
    loadOptions?: any;
    onCreateOption?: any;
    valueKey?: string;
    labelKey?: string;
    isFetching?: boolean;
    value?: any;
}
export declare class Select extends Component<SelectProps> {
    __select: any;
    static defaultProps: {
        isClearable: boolean;
    };
    state: any;
    private onChange;
    private focus;
    getSelectProps(): {
        classNamePrefix: string;
        isClearable: boolean;
        styles: {
            menuPortal: (base: any) => any;
        };
        menuPortalTarget: HTMLElement;
        backspaceRemovesValue: boolean;
        isDisabled: boolean;
        ref: (ref: any) => void;
        isMulti: boolean;
        placeholder: string;
        value: any;
        onChange: (option: any) => void;
        options: {
            value: any;
            label: string;
            options?: {
                value: any;
                label: string;
            }[];
        }[];
    };
    renderSelect(): JSX.Element;
    render(): React.ReactNode;
}
