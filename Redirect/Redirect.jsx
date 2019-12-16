var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import { withRouter } from '@audentio/utils/src/withRouter';
import React, { Component } from 'react';
import { Redirect as OriginalRedirect } from 'react-router-dom';
let Redirect = class Redirect extends Component {
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
        return <OriginalRedirect {...props} to={to}/>;
    }
};
Redirect.defaultProps = {
    statusCode: 302,
};
Redirect = __decorate([
    withRouter
], Redirect);
export { Redirect };
//# sourceMappingURL=Redirect.jsx.map