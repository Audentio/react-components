import { classy } from '@audentio/utils/src/classy';
import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component } from 'react';
import style from './Clickable.scss';

interface ClickableProps {
    onClick?: (e) => void;
    href: string;

    /* HTML element to use. div by default */
    element?: any;

    history?: any;
    match?: any;
    location?: any;
    innerRef?: any;
    staticContext?: any;
}

@withRouter
export class Clickable extends Component<ClickableProps & React.HTMLProps<HTMLElement>> {
    static defaultProps = {
        element: 'div',
    };

    onClick = (e: React.MouseEvent<HTMLElement>) => {
        const { href, history, onClick } = this.props;

        if (onClick) {
            onClick(e);
        }

        if (!href) return;

        const target = e.target as HTMLAnchorElement;

        if (
            // not anchor
            !target.href &&
            !(target.parentNode as HTMLAnchorElement).href &&
            // not button
            target.nodeName !== 'BUTTON' &&
            target.parentNode.nodeName !== 'BUTTON'
        ) {
            const isExternal = isExternalUrl(href);

            if (e.metaKey && !isExternal) {
                // cmd+click internal link – open in new tab
                window.open(window.location.origin + href, '_blank');
            } else if (isExternal) {
                // external link always open in new tab
                window.open(href, '_blank');
            } else {
                // internal link
                // push to history
                history.push(href);
            }
        }

        // don't do anything if a nested anchor or button was clicked
    };

    public render(): React.ReactNode {
        const {
            className,
            href,
            element: Element,
            history,
            match,
            location,
            staticContext,
            innerRef,
            ...props
        } = this.props;

        return (
            <Element
                {...props}
                className={classy(href && style.clickable, className)}
                onClick={this.onClick}
                ref={innerRef}
            />
        );
    }
}
