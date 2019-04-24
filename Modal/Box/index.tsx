import { FocusLock } from '@atlaskit/layer-manager';
import { classy } from '@audentio/utils/src/classy';
import { keymap } from '@audentio/utils/src/keymap';
import React, { Component } from 'react';
import { Backdrop } from '../../Backdrop';
import { Icon } from '../../Icon';
import { ScrollLock } from '../../ScrollLock';
import style from '../Modal.scss';

export default class ModalBox extends Component<any> {
    __node: HTMLElement;

    __nodeInner: HTMLElement;

    static defaultProps = {
        overlay: true,
    };

    componentDidMount() {
        document.addEventListener('keydown', this.keyDownListener);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownListener);
    }

    keyDownListener = e => {
        const { onClose } = this.props;

        if (onClose && e.keyCode === keymap.ESCAPE) {
            onClose(e);
        }
    };

    render() {
        const { overlay, opacity, children, className, containerClass, onClose, canClose, ...rest } = this.props;

        return (
            <FocusLock enabled autoFocus>
                <div className={classy(style.wrapper, style.visible, containerClass)} style={{ opacity }} {...rest}>
                    {overlay && (
                        <Backdrop onClick={onClose} className={style.backdrop}>
                            {canClose && <Icon>close</Icon>}
                        </Backdrop>
                    )}

                    <div
                        ref={ref => {
                            if (!this.__node) {
                                this.__node = ref;
                            }
                        }}
                        className={classy(style.modal, className)}
                    >
                        <div
                            ref={ref => {
                                this.__nodeInner = ref;
                            }}
                        >
                            <Icon name="close" onClick={onClose} className={style.dismiss} />
                            {children}
                        </div>
                    </div>

                    <ScrollLock />
                </div>
            </FocusLock>
        );
    }
}
