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
const preprocess = (source: string) => {
    let processed = source;

    preprocessors.forEach(processor => {
        processed = processor(processed);
    });

    return processed;
};

// User parser to convert markdown string into react components
// output can then be rendered with react
const renderMarkdown = (rawSource: string, toDisable: string) => {
    const source = preprocess(rawSource);
    const parsed = parser(source, { exclude: toDisable });
    return parsed;
};

export interface RenderMarkdownProps {
    /**
     * Markdown source string
     */
    children: string;

    /**
     * Render as string, without any wrapper element
     */
    noWrap?: boolean;

    /**
     * Comma separated list of markdown-it plugins to disable
     */
    disable?: string;

    className?: string;
    style?: React.CSSProperties;

    components: { [key: string]: any };
}

export class RenderMarkdown extends Component<RenderMarkdownProps> {
    static renderMarkdown = renderMarkdown;

    static defaultProps = {
        disable: '', // all plugins enabled by default
        noWrap: false,
    };

    public render(): React.ReactNode {
        const { noWrap, children, className, disable, components, ...props } = this.props;
        if (!children) return null;

        let rendered_content;

        // Try parsing
        try {
            rendered_content = renderer(renderMarkdown(children, disable), components);
        } catch (err) {
            // silently fail
            // show raw string if parser fails
            rendered_content = children;

            if (__DEV__) throw err;

            // log in sentry, so we know when this happens
            Sentry.captureException(err, {
                extra: {
                    parser_version: 2,
                    markdown_source: children,
                },
            });
        }

        let Wrapper: any = 'div';

        if (noWrap) Wrapper = Fragment;

        return (
            <Wrapper className={classy(style.wrapper, className)} {...props}>
                {rendered_content}
            </Wrapper>
        );
    }
}
