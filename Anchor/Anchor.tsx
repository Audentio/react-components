import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import { passProps } from '@audentio/utils/src/passProps';
import * as Sentry from '@sentry/minimal';
import React, { Component } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface AnchorProps extends Omit<NavLinkProps, 'to'> {
    /**
     * Local pathname or external URI
     */
    href: string;

    title?: string;
    className?: string;
    style?: { [key: string]: any };
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
}

/**
 * Anchor component (internal and external links)
 */
export class Anchor extends Component<AnchorProps> {
    static defaultProps = {
        href: '#',
    };

    componentDidMount() {
        // avoid double report
        if (__BROWSER__ && !this.props.href) {
            Sentry.captureMessage('Anchor recieved falsy href');
        }
    }

    getHref() {
        const { href } = this.props;

        if (href && href.indexOf(window.location.origin) === 0) {
            return href.replace(window.location.origin, '');
        }

        return href;
    }

    render() {
        const { children, innerRef, external, ...props } = this.props;

        const href = this.getHref();

        // is external path
        if (isExternalUrl(href) || external) {
            return (
                <a ref={innerRef} target="_blank" rel="noopener noreferrer" href={href} {...passProps(props)}>
                    {children}
                </a>
            );
        }

        // Internal path
        // react-router Link
        return (
            <NavLink innerRef={innerRef} to={href} {...props} {...passProps(props)}>
                {children}
            </NavLink>
        );
    }
}
