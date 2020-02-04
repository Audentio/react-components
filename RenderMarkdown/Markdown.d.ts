import React, { Component } from 'react';
declare type renderMarkdownOpts = {
    enableHtml?: boolean;
};
export interface RenderMarkdownProps {
    /**
     * Markdown source string
     */
    children: string;
    /**
     * Allow HTML in source
     */
    enableHtml?: boolean;
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
    components: {
        [key: string]: any;
    };
}
export declare class RenderMarkdown extends Component<RenderMarkdownProps> {
    static renderMarkdown: (rawSource: string, toDisable: string, { enableHtml }?: renderMarkdownOpts) => any[];
    static defaultProps: {
        disable: string;
        noWrap: boolean;
    };
    render(): JSX.Element;
}
export {};
