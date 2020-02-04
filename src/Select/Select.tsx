import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import { Schema } from 'yup';
import { BaseInputProps } from '../Input';
import { InputErrors } from '../InputErrors';
import { InputLabel } from '../InputLabel';
import style from './Select.scss';

export interface SelectProps extends Omit<BaseInputProps, 'schema'> {
    options?:
        | Array<{ value: any; label: string }>
        | Array<{ label: string; options: Array<{ value: any; label: string }> }>;
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

    /* load options asynchronously */
    loadOptions?: any;

    /* allow creating new option */
    onCreateOption?: any;

    valueKey?: string;
    labelKey?: string;

    isFetching?: boolean;

    value?: any;
}

export class Select extends Component<SelectProps> {
    __select: any;

    static defaultProps = {
        isClearable: true,
    };

    state: any = {};

    private onChange = (option): void => {
        const { multi, name, onChange, valueKey = 'value' } = this.props;

        const value = option && option[valueKey];

        if (multi) {
            onChange({
                name,
                value: option.map(opt => opt.value),
            });
        } else {
            onChange({
                name,
                value,
            });
        }
    };

    private focus = (): void => {
        if (this.__select) {
            this.__select.focus();
        }
    };

    getSelectProps() {
        const {
            options = [],
            multi,
            isClearable,
            value,
            placeholder,
            valueKey = 'value',
            loadOptions,
            disabled,
        } = this.props;

        let selectValue;

        if (value instanceof Array) {
            // multiple values
            // @ts-ignore
            selectValue = value.map(val => options.find(opt => opt[valueKey] === val));
        } else if (value !== undefined && !loadOptions) {
            // single value
            // @ts-ignore
            selectValue = options.find(opt => opt[valueKey] === value);
        }

        return {
            classNamePrefix: 'reactSelect',
            isClearable,
            styles: {
                menuPortal: base => {
                    const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
                    return { ...rest, zIndex: 9999 };
                },
            },
            menuPortalTarget: __BROWSER__ && document.body,
            backspaceRemovesValue: isClearable,
            isDisabled: disabled,
            ref: ref => {
                this.__select = ref;
            },
            isMulti: multi,
            placeholder,
            value: selectValue,
            onChange: this.onChange,
            options,
        };
    }

    renderSelect() {
        const { loadOptions, onCreateOption, errors, help, label, block, size, disabled, ...props } = this.props;
        const selectProps = this.getSelectProps();

        if (loadOptions && onCreateOption) {
            return (
                <AsyncCreatableSelect
                    loadOptions={loadOptions}
                    onCreateOption={onCreateOption}
                    {...props}
                    {...selectProps}
                />
            );
        }

        if (loadOptions) {
            return <AsyncSelect loadOptions={loadOptions} {...props} {...selectProps} />;
        }

        if (onCreateOption) {
            return <CreatableSelect onCreateOption={onCreateOption} {...props} {...selectProps} />;
        }

        return <ReactSelect {...props} {...selectProps} visible open />;
    }

    public render(): React.ReactNode {
        const { errors, help, label, className, block, isFetching, size, disabled } = this.props;
        const containerClass = classy(
            style.container,
            disabled && style.container__disabled,
            block && style.container__block,
            isFetching && style.container__isFetching,
            size && style[`container__${size}`],
            className
        );

        return (
            <div className={containerClass}>
                <InputLabel label={label} help={help} onClick={this.focus} />

                {this.renderSelect()}

                <InputErrors errors={errors} onClick={this.focus} />
            </div>
        );
    }
}
