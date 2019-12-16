/// <reference types="node" />
import React, { Component } from 'react';
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
export declare class CodeBlock extends Component<CodeBlockProps> {
    _isMounted: boolean;
    __label: HTMLElement;
    __code: HTMLElement;
    copyTimer: NodeJS.Timer;
    static defaultProps: {
        highlight: boolean;
        fixWhiteSpace: boolean;
        theme: string;
    };
    state: {
        copied: boolean;
    };
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getSource(children: any): any;
    private copyToClipboard;
    runHighlighter: () => void;
    fixWhiteSpace($code: any): any;
    render(): React.ReactNode;
}
export {};
