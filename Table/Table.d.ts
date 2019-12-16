import React, { Component } from 'react';
export interface TableProps {
    className?: string;
    rows: Array<Object>;
    scroll?: boolean;
    /**
     * table row renderer
     * use width to determine how to render rows
     */
    renderRow: (row: any, args: {
        width: number;
        index: number;
    }) => React.ReactNode;
    /**
     * table header renderer
     * same as renderRow, but you should use Table.Th instead of Table.Td
     */
    renderHeader: (args: {
        width: number;
    }) => React.ReactNode;
    /**
     * Compact table (less padding)
     */
    compact?: boolean;
    /**
     * Rounded corners
     */
    round?: boolean;
    /**
     * Do not wait for width to be measured
     * (this may flash mobile rows if you have any)
     * Safe to use if you only use one row layout
     */
    renderImmediately?: boolean;
    /**
     * Graphql cursor
     * if passed and there are more than 1 pages, pagination will be shown
     */
    cursor?: any;
    afterRows?: any;
    /**
     * Callback for pagination
     */
    onPageChange?: (page: number) => void;
    loading?: boolean;
}
interface TrProps {
    className?: string;
    children: React.ReactNode;
}
interface TdProps {
    className?: string;
    children?: React.ReactNode;
    width?: number;
    stretch?: boolean;
    textAlign?: 'center' | 'left' | 'right';
}
export declare class Table extends Component<TableProps> {
    static Tr: ({ className, ...props }: TrProps & React.HTMLProps<HTMLTableRowElement>) => JSX.Element;
    static Td: ({ className, width, textAlign, ...props }: TdProps & React.HTMLProps<HTMLTableCellElement>) => JSX.Element;
    static Th: ({ className, width, textAlign, ...props }: TdProps & React.HTMLProps<HTMLTableHeaderCellElement>) => JSX.Element;
    static defaultProps: {
        round: boolean;
        scroll: boolean;
        renderImmediately: boolean;
    };
    render(): React.ReactNode;
}
export {};
