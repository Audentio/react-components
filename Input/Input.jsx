import { classy } from '@audentio/utils/src/classy';
import { passProps } from '@audentio/utils/src/passProps';
import { stylish } from '@audentio/utils/src/stylish';
import React, { Component } from 'react';
import { Icon } from '../Icon';
import { InputErrors } from '../InputErrors';
import { InputLabel } from '../InputLabel';
import { Timestamp } from '../Timestamp';
import style from './Input.scss';
export class Input extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            focus: false,
            color: null,
        };
        this.__inputRef = React.createRef();
        this.getPlaceholder = () => this.props.placeholder;
        this.onChange = (e) => {
            const { name, onChange } = this.props;
            onChange({ name, value: e.currentTarget.value });
        };
        /**
         * iOS autofill doesnt trigger onChange but does trigger onFocus
         * we'll trigger onChange manually when that happens if input doesn't already have a value
         */
        this.onFocus = (e) => {
            const { triggerFormUpdate, value } = this.props;
            // not needed if input has value
            if (value && typeof value === 'string' && value.length > 0)
                return;
            // not needed on non-touch
            if (!('ontouchstart' in window))
                return;
            if (triggerFormUpdate)
                triggerFormUpdate();
        };
        this.onBlur = () => {
            const { name, onBlur } = this.props;
            if (onBlur)
                onBlur({ name });
        };
        this.focus = () => {
            if (this.__inputRef) {
                this.__inputRef.current.focus();
            }
        };
    }
    render() {
        const { value, prefix = null, label, isFetching, help, spellCheck, containerClass, className, type, disabled, block, large, size, icon, maxLength, autoFocus, autoComplete, errors, ...rest } = this.props;
        let { initialValue } = this.props;
        const { focus } = this.state;
        // Decide input tagname based on type
        const InputTag = type === 'textarea' ? 'textarea' : 'input';
        let hasColorInputSupport = null;
        if (type === 'color') {
            if (!initialValue) {
                initialValue = '#31385e';
            }
            hasColorInputSupport = (document) => {
                try {
                    const input = document.createElement('input');
                    input.type = 'color';
                    input.value = '!';
                    return input.type === 'color' && input.value !== '!';
                }
                catch (e) {
                    return false;
                }
            };
        }
        let inputValue = value;
        if (type === 'datetime-local') {
            inputValue = Timestamp.format(value, 'yyyy-MM-ddTHH:mm');
        }
        else if (type === 'date') {
            inputValue = Timestamp.format(value, 'yyyy-MM-dd');
        }
        return (<div className={classy(className, style.container, type === 'textarea' && style.container__textarea, size && style[`container__size__${size}`], stylish(style, 'container', {
            block,
            disabled,
            error: errors && errors.length,
            focus,
            isFetching,
            large,
        }), containerClass, icon && style.hasIcon)} style={this.props.style}>
                <InputLabel disabled={disabled} label={label} help={help} onClick={this.focus}/>

                <div className={style.inputwrapper}>
                    {prefix}

                    {type === 'color' && !hasColorInputSupport ? (<div className={style.nonNativeColor}>
                            <input {...passProps(rest)} style={{
            backgroundColor: this.state.color ? this.state.color : initialValue.toString(),
            cursor: 'pointer',
        }} ref={this.__inputRef} disabled={disabled} readOnly onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur} className={style.input} placeholder={this.getPlaceholder()}/>
                        </div>) : (<InputTag {...passProps(rest)} ref={this.__inputRef} type={type} disabled={disabled} autoComplete={autoComplete} onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur} value={inputValue} spellCheck={spellCheck} maxLength={maxLength} className={classy(style.input, type === 'textarea' && style.input__textarea)} autoFocus={autoFocus} placeholder={this.getPlaceholder()}/>)}

                    {icon && <Icon name={icon} className={style.icon}/>}
                </div>

                <InputErrors onClick={this.focus} errors={errors}/>
            </div>);
    }
}
Input.defaultProps = {
    // empty string to make sure input is always rendered as controlled
    value: '',
};
//# sourceMappingURL=Input.jsx.map