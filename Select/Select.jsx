import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import { InputErrors } from '../InputErrors';
import { InputLabel } from '../InputLabel';
import style from './Select.scss';
export class Select extends Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onChange = (option) => {
            const { multi, name, onChange, valueKey = 'value' } = this.props;
            const value = option && option[valueKey];
            if (multi) {
                onChange({
                    name,
                    value: option.map(opt => opt.value),
                });
            }
            else {
                onChange({
                    name,
                    value,
                });
            }
        };
        this.focus = () => {
            if (this.__select) {
                this.__select.focus();
            }
        };
    }
    getSelectProps() {
        const { options = [], multi, isClearable, value, placeholder, valueKey = 'value', loadOptions, disabled, } = this.props;
        let selectValue;
        if (value instanceof Array) {
            // multiple values
            // @ts-ignore
            selectValue = value.map(val => options.find(opt => opt[valueKey] === val));
        }
        else if (value !== undefined && !loadOptions) {
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
            return (<AsyncCreatableSelect loadOptions={loadOptions} onCreateOption={onCreateOption} {...props} {...selectProps}/>);
        }
        if (loadOptions) {
            return <AsyncSelect loadOptions={loadOptions} {...props} {...selectProps}/>;
        }
        if (onCreateOption) {
            return <CreatableSelect onCreateOption={onCreateOption} {...props} {...selectProps}/>;
        }
        return <ReactSelect {...props} {...selectProps} visible open/>;
    }
    render() {
        const { errors, help, label, className, block, isFetching, size, disabled } = this.props;
        const containerClass = classy(style.container, disabled && style.container__disabled, block && style.container__block, isFetching && style.container__isFetching, size && style[`container__${size}`], className);
        return (<div className={containerClass}>
                <InputLabel label={label} help={help} onClick={this.focus}/>

                {this.renderSelect()}

                <InputErrors errors={errors} onClick={this.focus}/>
            </div>);
    }
}
Select.defaultProps = {
    isClearable: true,
};
//# sourceMappingURL=Select.jsx.map