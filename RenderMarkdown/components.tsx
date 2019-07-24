import { Anchor } from '@audentio/components/Anchor';
import { Blockquote } from '@audentio/components/Blockquote';
import { Code } from '@audentio/components/Code';
import { CodeBlock } from '@audentio/components/CodeBlock';
import { Heading } from '@audentio/components/Heading';
import { Hr } from '@audentio/components/Hr';
import { Paragraph } from '@audentio/components/Paragraph';
import { Timestamp } from '@audentio/components/Timestamp';
import { Image } from 'components/MarkdownEditor/components/Image';
import { Notice } from 'components/Notice';
import { Strong } from 'components/Strong';
import React from 'react';
import { isExternalUrl } from 'utils/isExternalUrl';
import { TimestampProps } from '../Timestamp/Timestamp';

// Components
// - renderer will try look for tag in this object
// - will fall back to html elements if not found
const components = {
    em: ({ children }) => <em>{children}</em>,
    img: ({ src }) => <Image src={src} />,
    u: ({ children }) => <u>{children}</u>,
    strong: ({ children }) => <Strong>{children}</Strong>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
    heading: ({ children, level }) => <Heading kind={`h${level}`}>{children}</Heading>,
    code: props => {
        if (props.isBlock) {
            return <CodeBlock language={props.info}>{props.children}</CodeBlock>;
        }

        return <Code>{props.children}</Code>;
    },
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
    container: ({ type, children, info }) => {
        if (type === 'notice') {
            const kind = info.split('notice ')[1];
            return <Notice kind={kind}>{children}</Notice>;
        }

        return <div>{children}</div>;
    },
    // temporarily append http to URLs without protocols
    // todo: @tusharsingh improve with regex(?)
    a: ({ href, title, children }) => {
        let finalHref = !isExternalUrl(href) && href.indexOf('.') > 1 ? `http://${href}` : href;

        if (finalHref) {
            finalHref = finalHref.split('__CURRENT_URL__').join(window.location.href);
        }

        return (
            <Anchor external={href.indexOf('.') > 1} href={finalHref} title={title}>
                {children}
            </Anchor>
        );
    },
    // ol: ({ children }) => <List ordered>{children}</List>,
    // ul: ({ children }) => <List>{children}</List>,
    hr: () => <Hr />,
    time: ({ children, format }) => {
        const props: TimestampProps = {
            children,
        };

        if (format === 'relative' || format === 'calendar') {
            props.output = format;
        } else {
            props.format = format;
        }

        return <Timestamp {...props} />;
    },
};

export default components;
