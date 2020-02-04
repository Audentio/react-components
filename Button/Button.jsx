import { classy } from '@audentio/utils/src/classy';
import { passProps } from '@audentio/utils/src/passProps';
import React, { Component } from 'react';
import { Anchor } from '../Anchor';
import { Icon } from '../Icon';
import { MousemoveGlow } from '../MousemoveGlow';
import style from './Button.scss';
export class Button extends Component {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            const { onClick, disabled, isFetching } = this.props;
            if (disabled || isFetching) {
                e.preventDefault();
                return;
            }
            if (onClick && typeof onClick === 'function') {
                e.preventDefault();
                onClick(e);
            }
        };
        this.removeFocus = () => {
            if (this.__btn) {
                this.__btn.blur();
            }
        };
    }
    componentDidMount() {
        if (this.__btn && this.props.autoFocus) {
            this.__btn.focus();
        }
    }
    render() {
        const { kind, children, border, size, bg, icon, text, dialog, iconPlacement, block, alt, isFetching, type, disabled, href, disableGlow, innerRef, weight, ...rest } = this.props;
        const className = classy('button', style.button, alt && style.alt, block && style.block, disabled && style.button_disabled, kind && style[`button_${kind}`], size && style[`button_${size}`], border && style.button_border, weight && style[`button_${weight}`], text && style.button_text, dialog && style.button_dialog, bg && style[`button_${bg}`], children && style.button_hasText, isFetching && style.button_isFetching, this.props.className);
        const buttonContent = (<>
                {icon && iconPlacement === 'left' ? (<Icon className={classy(style.icon, style.icon_left)} name={icon}>
                        {icon}
                    </Icon>) : ('')}
                {children}
                {icon && iconPlacement === 'right' ? (<Icon className={classy(style.icon, style.icon_right)} name={icon}>
                        {icon}
                    </Icon>) : ('')}
            </>);
        if (href) {
            return (<MousemoveGlow disabled={disabled || text || disableGlow || !kind}>
                    <Anchor {...passProps(rest)} innerRef={ref => {
                this.__btn = ref;
                if (innerRef)
                    innerRef(ref);
            }} href={href} onClick={this.onClick} className={className}>
                        {buttonContent}
                    </Anchor>
                </MousemoveGlow>);
        }
        return (<MousemoveGlow disabled={disabled || text || disableGlow || !kind}>
                <button {...passProps(rest)} ref={ref => {
            this.__btn = ref;
            if (innerRef)
                innerRef(ref);
        }} onMouseUp={this.removeFocus} disabled={disabled} type={type} onClick={this.onClick} className={className}>
                    {buttonContent}
                </button>
            </MousemoveGlow>);
    }
}
Button.defaultProps = {
    type: 'button',
    iconPlacement: 'left',
};
//# sourceMappingURL=Button.jsx.map