var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { classy } from '@audentio/utils/src/classy';
import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component } from 'react';
import style from './Clickable.scss';
let Clickable = class Clickable extends Component {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            const { href, history, onClick } = this.props;
            if (onClick) {
                onClick(e);
            }
            if (!href)
                return;
            const target = e.target;
            if (
            // not anchor
            !target.href &&
                !target.parentNode.href &&
                // not button
                target.nodeName !== 'BUTTON' &&
                target.parentNode.nodeName !== 'BUTTON') {
                const isExternal = isExternalUrl(href);
                if (e.metaKey && !isExternal) {
                    // cmd+click internal link – open in new tab
                    window.open(window.location.origin + href, '_blank');
                }
                else if (isExternal) {
                    // external link always open in new tab
                    window.open(href, '_blank');
                }
                else {
                    // internal link
                    // push to history
                    history.push(href);
                }
            }
            // don't do anything if a nested anchor or button was clicked
        };
    }
    render() {
        const { className, href, element: Element, history, match, location, staticContext, innerRef, ...props } = this.props;
        return (<Element {...props} className={classy(href && style.clickable, className)} onClick={this.onClick} ref={innerRef}/>);
    }
};
Clickable.defaultProps = {
    element: 'div',
};
Clickable = __decorate([
    withRouter
], Clickable);
export { Clickable };
//# sourceMappingURL=Clickable.jsx.map