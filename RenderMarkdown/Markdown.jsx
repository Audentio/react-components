import { classy } from '@audentio/utils/src/classy';
import { Sentry } from '@audentio/utils/src/Sentry';
import React, { Component, Fragment } from 'react';
import style from './Markdown.scss';
import parser from './parser';
import preprocessors from './preprocessors';
import renderer from './renderer';
// Run raw markdown string through preprocessors
// preprocessors don't render markdown, but convert stuff to markdown
// e.g. "ticket #123" to "[ticket #123](https://admin.audent.io/tickets/123)"
const preprocess = (source) => {
    let processed = source;
    preprocessors.forEach((processor) => {
        processed = processor(processed);
    });
    return processed;
};
const renderMarkdown = (rawSource, toDisable, { enableHtml } = {}) => {
    const source = preprocess(rawSource);
    const parsed = parser(source, { exclude: toDisable, enableHtml });
    return parsed;
};
export class RenderMarkdown extends Component {
    render() {
        const { noWrap, children, className, disable, enableHtml, components, ...props } = this.props;
        if (!children)
            return null;
        let rendered_content;
        // Try parsing
        try {
            rendered_content = renderer(renderMarkdown(children, disable, { enableHtml }), components);
        }
        catch (err) {
            // silently fail
            // show raw string if parser fails
            rendered_content = children;
            if (__DEV__)
                throw err;
            // log in sentry, so we know when this happens
            Sentry.captureException(err, {
                extra: {
                    parser_version: 2,
                    markdown_source: children,
                },
            });
        }
        let Wrapper = 'div';
        if (noWrap)
            Wrapper = Fragment;
        return (<Wrapper className={classy(style.wrapper, className)} {...props}>
                {rendered_content}
            </Wrapper>);
    }
}
RenderMarkdown.renderMarkdown = renderMarkdown;
RenderMarkdown.defaultProps = {
    disable: '',
    noWrap: false,
};
//# sourceMappingURL=Markdown.jsx.map