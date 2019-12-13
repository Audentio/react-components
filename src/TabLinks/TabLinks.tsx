import { classy } from '@audentio/utils/src/classy';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component, RefObject } from 'react';
import { Anchor, AnchorProps } from '../Anchor';
import { Badge } from '../Badge';
import style from './TabLinks.scss';

export interface TabLinkProps {
    children: React.ReactNode;
    forceActive?: boolean;
    count?: number;
}

export interface TabLinksProps {
    className?: string;
    location?: any;
    staticContext?: any;
}

const TabLink = ({
    className,
    activeClassName,
    href,
    count,
    forceActive,
    children,
    ...props
}: AnchorProps & TabLinkProps) => (
    <li>
        <Anchor
            exact
            className={classy(
                style.tabLink,
                className,
                forceActive && style.tabLink__active,
                forceActive && activeClassName
            )}
            activeClassName={classy(style.tabLink__active, activeClassName)}
            href={href}
            {...props}
        >
            {children}
            {count && (
                <Badge size="sm" className={style.badge}>
                    {count}
                </Badge>
            )}
        </Anchor>
    </li>
);

@withRouter
export class TabLinks extends Component<TabLinksProps & React.Props<HTMLUListElement>> {
    static Link = TabLink;

    public componentDidMount(): void {
        const ref = this.__tabLinks.current as HTMLUListElement;
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

    __tabLinks = React.createRef();

    public render(): React.ReactNode {
        const { children, className, ...props } = this.props;

        return (
            <ul
                className={classy(style.tabLinks, className)}
                ref={this.__tabLinks as RefObject<HTMLUListElement>}
                {...props}
            >
                {this.props.children}
            </ul>
        );
    }
}
