import { classy } from '@audentio/utils/src/classy';
import { passProps } from '@audentio/utils/src/passProps';
import React, { Component } from 'react';
import { Anchor } from '../Anchor';
import { Icon, IconType } from '../Icon';
import { MousemoveGlow } from '../MousemoveGlow';
import style from './Button.scss';

export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    kind?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    size?: 'large' | 'small' | 'xs';
    bg?: 'light' | 'dark';
    href?: string;
    icon?: IconType;
    iconPlacement?: 'left' | 'right';
    type?: 'button' | 'submit' | 'reset';
    weight?: 'normal' | 'semi' | 'bold';
    disabled?: boolean;
    onClick?: Function;
    isFetching?: boolean;
    alt?: boolean;
    border?: boolean;
    text?: boolean;
    dialog?: boolean;
    autoFocus?: boolean;
    disableGlow?: boolean;
    style?: any;
    name?: string;

    innerRef?: (r: HTMLElement) => void;
    block?: boolean;
}

export class Button extends Component<ButtonProps> {
    __btn: HTMLElement;

    static defaultProps = {
        type: 'button',
        iconPlacement: 'left',
    };

    public componentDidMount(): void {
        if (this.__btn && this.props.autoFocus) {
            this.__btn.focus();
        }
    }

    private onClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
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

    private removeFocus = (): void => {
        if (this.__btn) {
            this.__btn.blur();
        }
    };

    public render(): React.ReactNode {
        const {
            kind,
            children,
            border,
            size,
            bg,
            icon,
            text,
            dialog,
            iconPlacement,
            block,
            alt,
            isFetching,
            type,
            disabled,
            href,
            disableGlow,
            innerRef,
            weight,
            ...rest
        } = this.props;

        const className = classy(
            'button',
            style.button,
            alt && style.alt,
            block && style.block,
            disabled && style.button_disabled,
            kind && style[`button_${kind}`],
            size && style[`button_${size}`],
            border && style.button_border,
            weight && style[`button_${weight}`],
            text && style.button_text,
            dialog && style.button_dialog,
            bg && style[`button_${bg}`],
            children && style.button_hasText,
            isFetching && style.button_isFetching,
            this.props.className
        );

        const buttonContent = (
            <>
                {icon && iconPlacement === 'left' ? (
                    <Icon className={classy(style.icon, style.icon_left)} name={icon}>
                        {icon}
                    </Icon>
                ) : (
                    ''
                )}
                {children}
                {icon && iconPlacement === 'right' ? (
                    <Icon className={classy(style.icon, style.icon_right)} name={icon}>
                        {icon}
                    </Icon>
                ) : (
                    ''
                )}
            </>
        );

        if (href) {
            return (
                <MousemoveGlow disabled={disabled || text || disableGlow || !kind}>
                    <Anchor
                        {...passProps(rest)}
                        innerRef={ref => {
                            this.__btn = ref;
                            if (innerRef) innerRef(ref);
                        }}
                        href={href}
                        onClick={this.onClick}
                        className={className}
                    >
                        {buttonContent}
                    </Anchor>
                </MousemoveGlow>
            );
        }

        return (
            <MousemoveGlow disabled={disabled || text || disableGlow || !kind}>
                <button
                    {...passProps(rest)}
                    ref={ref => {
                        this.__btn = ref;
                        if (innerRef) innerRef(ref);
                    }}
                    onMouseUp={this.removeFocus}
                    disabled={disabled}
                    type={type}
                    onClick={this.onClick}
                    className={className}
                >
                    {buttonContent}
                </button>
            </MousemoveGlow>
        );
    }
}
