/* eslint-disable no-use-before-define */
import React from 'react';
function resolveToken(token, components) {
    const { type, children, tag, reactProps, ...props } = token;
    if (type === 'inline') {
        return resolveTokens(children, components);
    }
    if (!tag) {
        // no tag. render children or content
        return children;
    }
    let Component = components[tag] || tag;
    if (components[tag]) {
        // React component available for this
        // append reactProps to props object
        for (const prop in reactProps) {
            props[prop] = reactProps[prop];
        }
    }
    if (type === 'heading' && components.heading) {
        // token is heading and Heading component is available
        Component = components.heading;
        props.level = Number(tag.slice(1));
    }
    if (type.indexOf('container_') === 0 && components.container) {
        // token is container and Container component is available
        Component = components.container;
        for (const prop in reactProps) {
            props[prop] = reactProps[prop];
        }
        props.type = type.replace('container_', '');
    }
    if (type === 'image') {
        // Images can't have children
        return <Component {...props}/>;
    }
    return (<Component {...props}>
            {typeof children === 'object' ? resolveTokens(children, components) : children}
        </Component>);
}
function resolveTokens(tokens, components) {
    if (!tokens)
        return null;
    return tokens.map((token, key) => resolveToken(Object.assign({ key }, token), components));
}
export default function renderer(tokens, components) {
    return resolveTokens(tokens, components);
}
//# sourceMappingURL=renderer.jsx.map