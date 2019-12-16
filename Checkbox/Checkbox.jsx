import { classy } from '@audentio/utils/src/classy';
import { keymap } from '@audentio/utils/src/keymap';
import React, { Component } from 'react';
import { Icon } from '../Icon';
import { InputErrors } from '../InputErrors';
import { Text } from '../Text';
import style from './Checkbox.scss';
export class Checkbox extends Component {
    constructor() {
        super(...arguments);
        this.toggle = (e) => {
            if (e.target && e.target.nodeName === 'A') {
                return;
            }
            const { name, value, onChange, disabled, values } = this.props;
            if (disabled)
                return;
            e.preventDefault();
            onChange({
                name,
                value: values[(!value).toString()],
            });
        };
        this.onKeyDown = (e) => {
            if (e.keyCode === keymap.SPACE || e.keyCode === keymap.ENTER) {
                this.toggle(e);
            }
        };
        this.removeFocus = () => {
            // remove focus onClick
            if (this.__checkbox) {
                this.__checkbox.blur();
            }
        };
        this.saveRef = (ref) => {
            this.__checkbox = ref;
        };
    }
    render() {
        const { value: checked, block, render, errors, kind, className, color, label, disabled } = this.props;
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
        return (<div className={classy(style.container, disabled && style.container__disabled, block && style.container__block)} onClick={this.toggle}>
                <div style={checked ? { backgroundColor: color } : {}} onKeyDown={this.onKeyDown} onClick={this.removeFocus} tabIndex={!disabled ? 0 : undefined} className={classy(style.checkbox, kind && style[`checkbox__${kind}`], checked && style.checked, className)} ref={this.saveRef}>
                    <Text dynamicBg={color}>
                        <Icon name="check"/>
                    </Text>
                </div>

                {label && <div className={style.label}>{label}</div>}

                <InputErrors className={style.errors} errors={errors}/>
            </div>);
    }
}
Checkbox.defaultProps = {
    values: {
        true: true,
        false: false,
    },
};
//# sourceMappingURL=Checkbox.jsx.map