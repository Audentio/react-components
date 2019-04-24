import { classy } from '@audentio/utils/src/classy';
import React, { Component, Fragment } from 'react';
import { ERD } from '../ERD';
import TablePagination from './Pagination';
import style from './Table.scss';

interface TableProps {
    className?: string;
    rows: Array<Object>;

    scroll?: boolean;

    /**
     * table row renderer
     * use width to determine how to render rows
     */
    renderRow: (row: any, args: { width: number; index: number }) => React.ReactNode;

    /**
     * table header renderer
     * same as renderRow, but you should use Table.Th instead of Table.Td
     */
    renderHeader: (args: { width: number }) => React.ReactNode;

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

    // will render after rows are mapped but before pagination
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

export class Table extends Component<TableProps> {
    static Tr = ({ className, ...props }: TrProps & React.HTMLProps<HTMLTableRowElement>) => (
        <tr className={classy(style.tr, className)} {...props} />
    );

    static Td = ({ className, width, textAlign, ...props }: TdProps & React.HTMLProps<HTMLTableCellElement>) => (
        <td style={{ width, textAlign }} className={classy(style.td, className)} {...props} />
    );

    static Th = ({ className, width, textAlign, ...props }: TdProps & React.HTMLProps<HTMLTableHeaderCellElement>) => (
        <th style={{ width, textAlign }} className={classy(style.td, style.th, className)} {...props} />
    );

    static defaultProps = {
        round: true,
        scroll: true,
        renderImmediately: true,
    };

    render() {
        const {
            rows,
            renderRow,
            renderHeader,
            compact,
            round,
            scroll,
            className,
            onPageChange,
            renderImmediately,
            cursor,
            loading,
            afterRows,
        } = this.props;

        return (
            <div className={classy(style.tableContainer, scroll && style.scrollable)}>
                <ERD
                    nodeName="table"
                    className={classy(style.table, compact && style.compact, round && style.round, className)}
                >
                    {({ width }) => {
                        // don't render on browser until width has been measured
                        // TODO:
                        // create global cache of current viewport width and each table's relative width to it (requires ID on tables)
                        // - this will let us instantly render table without waiting after first view
                        if (!width && __BROWSER__ && !renderImmediately) {
                            return null;
                        }

                        const header: any = renderHeader({ width });

                        return (
                            <Fragment>
                                <thead>{header}</thead>
                                <tbody>
                                    {rows.map((row, index) => renderRow(row, { width, index }))}
                                    {afterRows}
                                    <TablePagination loading={loading} onPageChange={onPageChange} cursor={cursor} />
                                </tbody>
                            </Fragment>
                        );
                    }}
                </ERD>
            </div>
        );
    }
}
