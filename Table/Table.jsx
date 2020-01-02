import { classy } from '@audentio/utils/src/classy';
import React, { Component, Fragment } from 'react';
import { ERD } from '../ERD';
import TablePagination from './Pagination';
import style from './Table.scss';
export class Table extends Component {
    render() {
        const { rows, renderRow, renderHeader, compact, round, scroll, className, onPageChange, renderImmediately, cursor, loading, afterRows, } = this.props;
        return (<div className={classy(style.tableContainer, scroll && style.scrollable)}>
                <ERD nodeName="table" className={classy(style.table, compact && style.compact, round && style.round, className)}>
                    {({ width }) => {
            // don't render on browser until width has been measured
            // TODO:
            // create global cache of current viewport width and each table's relative width to it (requires ID on tables)
            // - this will let us instantly render table without waiting after first view
            if (!width && __BROWSER__ && !renderImmediately) {
                return null;
            }
            const header = renderHeader({ width });
            return (<Fragment>
                                <thead>{header}</thead>
                                <tbody>
                                    {rows.map((row, index) => renderRow(row, { width, index }))}
                                    {afterRows}
                                    <TablePagination loading={loading} onPageChange={onPageChange} cursor={cursor}/>
                                </tbody>
                            </Fragment>);
        }}
                </ERD>
            </div>);
    }
}
Table.Tr = ({ className, ...props }) => (<tr className={classy(style.tr, className)} {...props}/>);
Table.Td = ({ className, width, textAlign, ...props }) => (<td style={{ width, textAlign }} className={classy(style.td, className)} {...props}/>);
Table.Th = ({ className, width, textAlign, ...props }) => (<th style={{ width, textAlign }} className={classy(style.td, style.th, className)} {...props}/>);
Table.defaultProps = {
    round: true,
    scroll: true,
    renderImmediately: true,
};
//# sourceMappingURL=Table.jsx.map