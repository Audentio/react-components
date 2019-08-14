import { classy } from '@audentio/utils/src/classy';
import { throttle } from '@audentio/utils/src/throttle';
import React, { Component } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import style from './CodeBlock.scss';

interface CodeBlockProps {
    /**
     * code language (enables syntax highlighting)
     */
    language?: string;

    /**
     * Automatically fix indentation issues (removes indentation at start of code, so it doens't look odd)
     * @default true
     */
    fixWhiteSpace?: boolean;

    /**
     * Codeblock label. Pass boolean to use language as labbel
     */
    label?: string | boolean;

    className?: string;
}

export class CodeBlock extends Component<CodeBlockProps> {
    _isMounted: boolean;

    __label: HTMLElement;

    __code: HTMLElement;

    copyTimer: NodeJS.Timer;

    static defaultProps = {
        highlight: true,
        fixWhiteSpace: true,
        theme: 'tomorrow',
    };

    private state = {
        copied: false,
    };

    componentDidMount() {
        this._isMounted = true;
        this.runHighlighter();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // update if source changed
        return (
            this.getSource(nextProps.children) !== this.getSource(this.props.children) ||
            this.state.copied !== nextState.copied
        );
    }

    componentDidUpdate() {
        this.runHighlighter();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getSource(children) {
        if (typeof children === 'object') {
            const stringchildren = children.filter(child => typeof child === 'string');
            return stringchildren.join();
        }

        if (typeof children === 'string') return children;

        return children || '';
    }

    /* eslint-disable */
    copyToClipboard = str => {
        const el = document.createElement('textarea'); // Create a <textarea> element
        el.value = str; // Set its value to the string that you want copied
        el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px'; // Move outside the screen to make it invisible
        document.body.appendChild(el); // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0 // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0) // Store selection if found
                : false; // Mark as false to know no selection existed before
        el.select(); // Select the <textarea> content
        document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el); // Remove the <textarea> element
        if (selected) {
            // If a selection existed before copying
            document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
            document.getSelection().addRange(selected); // Restore the original selection
        }

        clearTimeout(this.copyTimer);

        this.setState({
            copied: true,
        });

        this.copyTimer = setTimeout(() => {
            this.setState({
                copied: false,
            });
        }, 1000);
    };
    /* eslint-enable */

    runHighlighter = throttle(
        () => {
            // const { language } = this.props;
            // if (!language) return;
            // // component not mounted
            // if (!this._isMounted) return;
            // loadLanguage(language).then(() => {
            //     Prism.highlightElement(this.__code);
            // });
        },
        500,
        false
    );

    fixWhiteSpace($code) {
        if (typeof $code !== 'string') return $code;

        let code;

        // remove first newline
        code = $code.replace(/[\s]+\n/, '');

        // remove extra indentation (due to JSX indent)
        const $indent = code.match(/[\s]+/);
        if ($indent) {
            const indent = $indent[0].replace(/\n([\s])/, '$1');
            const codelines = code.split('\n');

            code = codelines
                .map(line => {
                    if (line.indexOf(indent) === 0) {
                        return line.replace(indent, '');
                    }

                    return line;
                })
                .join('\n');
        }

        return code.trim();
    }

    public render(): React.ReactNode {
        const { label, children, language, fixWhiteSpace, className } = this.props;
        let code = this.getSource(children);

        if (fixWhiteSpace) {
            code = this.fixWhiteSpace(code);
        }

        return (
            <pre className={classy(style.container, className)}>
                {label && (
                    <div
                        ref={ref => {
                            this.__label = ref;
                        }}
                        className={style.label}
                    >
                        {label}
                    </div>
                )}

                <Tooltip position="left" content={this.state.copied ? 'Copied!' : 'Copy'}>
                    <span
                        onClick={() => {
                            this.copyToClipboard(code);
                        }}
                        className={style.copyToClipboard}
                    >
                        <Icon>content-copy</Icon>
                    </span>
                </Tooltip>

                <code
                    ref={ref => {
                        this.__code = ref;
                    }}
                    className={classy(style.code, language && `language-${language}`)}
                >
                    {code}
                </code>
            </pre>
        );
    }
}
