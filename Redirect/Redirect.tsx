import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component } from 'react';
import { Redirect as OriginalRedirect, RedirectProps as OriginalRedirectProps } from 'react-router-dom';

// Extended Redirect component
// - allows setting http status code (redirects on server)
// - supports external URLs

interface RedirectProps extends OriginalRedirectProps {
    /**
     * HTTP status code (used in SSR)
     */
    statusCode?: number;

    // Passed by StaticRouter
    staticContext?: {
        externalPath?: string;
        action?: string;
        statusCode?: number;
    };

    history?: any;
    location?: any;
}

@withRouter
export class Redirect extends Component<RedirectProps> {
    static defaultProps = {
        statusCode: 302,
    };

    render() {
        const { to, statusCode, staticContext, history, location, ...props } = this.props;
        let path = to;

        // support `to` object
        if (typeof to === 'object') {
            path = to.pathname;
        }

        // staticContext is available (being rendered in StaticRouter on server)
        // and status has been passed
        if (staticContext) {
            staticContext.statusCode = Number(statusCode);
        }

        // External URL passed
        if (typeof path === 'string' && isExternalUrl(path)) {
            if (__BROWSER__) {
                // TODO: workaround for getting previous pathname
                // potentially a HOC around BrowserRouter

                // Replace history entry with previous path
                // so back button works as expected
                // (takes you to redirect path otherwise, which takes you back to where you came from)
                // const previousPathname = location.previousPathname;
                // if (previousPathname && previousPathname !== location.pathname) {
                //     history.replace(previousPathname);
                // }

                // Set location.href
                window.location.href = path;

                // Render nothing
                return null;
            }

            // on server set externalPath in context
            // then we can res.redirect(staticContext.externalPath)
            staticContext.action = 'REPLACE';
            staticContext.externalPath = path;
            return null;
        }

        // Render react-router Redirect
        // handles internal redirects
        return <OriginalRedirect {...props} to={to} />;
    }
}
