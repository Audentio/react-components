/* eslint-disable no-use-before-define */

import MarkdownIt from 'markdown-it';
import plugin_container from 'markdown-it-container';
import plugin_emoji from 'markdown-it-emoji/light';
import memoize from 'memoizee';
import emojiconfig from './emoji';
import timestampPlugin from './plugin/timestamp';

// exclude: comma delimited list of plugins to disable
// not an array so it can be memoized easily
export const getParser = memoize(exclude => {
    const MdIt = new MarkdownIt({
        breaks: true,
        linkify: true,
        typographer: false,
        quotes: null,
    });

    MdIt.use(plugin_emoji, emojiconfig);
    MdIt.use(plugin_container, 'notice');
    MdIt.use(timestampPlugin);

    if (exclude && exclude.length) {
        MdIt.disable(exclude.split(','));
    }

    return MdIt;
});

/* Markdown-it parser outputs the weird open/close tags type tokens
 * that's incompatible with react as-is
 * we'll parse the parsed output coming from markdown-it, to make it usable
 */

const openRefs = [];

function insertToken(token, parent) {
    const { type, block, info, tag, content, children, props, attrs } = token;
    const modifiedToken = {
        type: type.replace('_open', '').replace('_close', ''),
        tag,
        // This object contains props meant for react components
        // will be skipped on html components by renderer
        reactProps: {
            isBlock: block,
            info,
            ...props,
        },
        children: content || children,
    };

    if (attrs) {
        // attributes are preset
        attrs.forEach((attr): void => {
            // index 0 = attr name
            // index 1 = attr value
            modifiedToken[attr[0]] = attr[1];
        });
    }

    // if (type === 'fence' || type === 'text' || type === 'code_inline' || type === 'emoji') {
    //     // Fence and text have content string
    //     // instead of children array
    //     // since that distinction doesn't matter to our renderer,
    //     // we'll use content as children
    //     modifiedToken.children = content;
    // }

    if (children && children.constructor === Array) {
        // Chilren is essentially another tokens array
        // recursively parse until we reach nodes with non-array/undefined children
        modifiedToken.children = parseRawTokens(children);
    }

    // Token insertion
    // ditching unnecessary info
    parent.push(modifiedToken);

    if (type.indexOf('_open') > -1) {
        // This was an opening tag. Save reference to openRefs
        // this will allow us to identify and write subsequent items to this token, until closed
        openRefs.push(parent[parent.length - 1]);
    }
}

function parseRawTokens(rawTokens) {
    // use existing context or create new
    // assumed object with children to keep it in accordance with md-it format
    const tokens = [];

    // keep track of number of tags open
    let openTags = 0;

    rawTokens.forEach((token): void => {
        const _isOpenTag = token.type.indexOf('_open') > -1;
        const _isCloseTag = token.type.indexOf('_close') > -1;

        if (token.type === 'fence') {
            insertToken(token, tokens);
        } else if (_isOpenTag) {
            // This is an opening tag

            if (openTags) {
                // another tag already open. append to its children
                const lastOpenTag = openRefs[openRefs.length - 1];
                if (!lastOpenTag.children) {
                    lastOpenTag.children = [];
                }

                insertToken(token, lastOpenTag.children);
            } else {
                insertToken(token, tokens);
            }

            openTags++;
        } else if (_isCloseTag) {
            // This is a closing tag

            // remove (this) closed token from open token refs
            // meaning new tokens will be inserted to previously opened token
            openRefs.splice(-1, 1);
            openTags--;
        } else if (openTags) {
            // another tag already open
            const lastOpenTag = openRefs[openRefs.length - 1];

            // Create empty children array
            // if it doesn't exist
            if (!lastOpenTag.children) lastOpenTag.children = [];

            // insert into last open token's children
            insertToken(token, lastOpenTag.children);
        } else {
            // Insert into root
            insertToken(token, tokens);
        }
    });
    return tokens;
}

export default function parse(source, { exclude } = {}) {
    const MdItParser = getParser(exclude);
    const rawTokens = MdItParser.parse(source, {});

    return parseRawTokens(rawTokens);
}
