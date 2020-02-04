var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { classy } from '@audentio/utils/src/classy';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component } from 'react';
import { Anchor } from '../Anchor';
import { Badge } from '../Badge';
import style from './TabLinks.scss';
const TabLink = ({ className, activeClassName, href, count, forceActive, children, ...props }) => (<li>
        <Anchor exact className={classy(style.tabLink, className, forceActive && style.tabLink__active, forceActive && activeClassName)} activeClassName={classy(style.tabLink__active, activeClassName)} href={href} {...props}>
            {children}
            {count && (<Badge size="sm" className={style.badge}>
                    {count}
                </Badge>)}
        </Anchor>
    </li>);
let TabLinks = class TabLinks extends Component {
    constructor() {
        super(...arguments);
        this.__tabLinks = React.createRef();
    }
    componentDidMount() {
        const ref = this.__tabLinks.current;
        const { location } = this.props;
        if (location && ref.scrollWidth === ref.clientWidth) {
            const tabLinksCollection = ref.children;
            const tabLinks = Array.prototype.slice.call(tabLinksCollection);
            tabLinks.forEach(tabLink => {
                if (tabLink.children[0].className.indexOf('tabLink__active') > -1) {
                    ref.scrollLeft = tabLink.offsetLeft - tabLink.offsetWidth;
                }
            });
        }
    }
    render() {
        const { children, className, ...props } = this.props;
        return (<ul className={classy(style.tabLinks, className)} ref={this.__tabLinks} {...props}>
                {this.props.children}
            </ul>);
    }
};
TabLinks.Link = TabLink;
TabLinks = __decorate([
    withRouter
], TabLinks);
export { TabLinks };
//# sourceMappingURL=TabLinks.jsx.map