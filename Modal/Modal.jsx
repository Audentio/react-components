/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from '../Overlay';
import ModalBox from './Box';
class LightboxPortal extends Component {
    render() {
        const { noOverlay, onClose, mountNode, className, visible, canClose, children, containerClass } = this.props;
        if (!visible)
            return null;
        const portal = ReactDOM.createPortal(<ModalBox containerClass={containerClass} className={className} canClose={canClose} onClose={onClose}>
                {children}
            </ModalBox>, mountNode);
        if (noOverlay)
            return portal;
        return <Overlay type="modal">{portal}</Overlay>;
    }
}
export class Modal extends Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onClick = (e) => {
            const { visible } = this.props;
            e.preventDefault();
            if (typeof visible !== 'boolean') {
                this.setState({
                    visible: true,
                });
            }
        };
        this.close = (e) => {
            const { onClose, visible } = this.props;
            e.preventDefault();
            if (typeof visible !== 'boolean') {
                this.setState({
                    visible: false,
                });
            }
            if (onClose)
                onClose();
        };
    }
    componentWillUnmount() {
        // destroy mount node
        if (this._mountNode)
            this._mountNode.remove();
    }
    getMountNode() {
        if (this._mountNode)
            return this._mountNode;
        this._mountNode = document.body.appendChild(document.createElement('div'));
        return this._mountNode;
    }
    render() {
        const { visible, trigger, className, children, onClose, containerClass, noOverlay } = this.props;
        // use visible prop if it's a boolean
        // otherwise use internal state
        const isVisible = typeof visible === 'boolean' ? visible : this.state.visible;
        return (<Fragment>
                
                {trigger &&
            React.cloneElement(React.Children.only(trigger), {
                onClick: this.onClick,
            })}

                {__BROWSER__ && (<LightboxPortal className={className} onClose={this.close} canClose={!!onClose} mountNode={this.getMountNode()} visible={isVisible} containerClass={containerClass} noOverlay={noOverlay}>
                        {children}
                    </LightboxPortal>)}
            </Fragment>);
    }
}
//# sourceMappingURL=Modal.jsx.map