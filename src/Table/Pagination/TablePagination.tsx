import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import { ActivityIndicator } from '../../ActivityIndicator';
import { Icon } from '../../Icon';
import style from './TablePagination.scss';

export default class TablePagination extends Component<any> {
    public render() {
        const { cursor, onPageChange, loading } = this.props;
        const totalPages = cursor && Math.ceil(cursor.total / cursor.perPage);

        if (!cursor || totalPages <= 1 || !onPageChange) return null;

        return (
            <tr>
                <td className={style.container} colSpan={99}>
                    <div className={style.row}>
                        <div className={style.meta}>{cursor.total} Total items</div>

                        <div className={style.pagination}>
                            {loading && <ActivityIndicator size={14} value={60} className={style.loading} />}

                            <Icon
                                name="chevron-left"
                                className={classy(style.arrow, cursor.currentPage === 1 && style.disabled)}
                                onClick={() => {
                                    onPageChange(cursor.currentPage - 1);
                                }}
                            />

                            <div className={style.current}>
                                {cursor.currentPage} of {totalPages}
                            </div>

                            <Icon
                                name="chevron-right"
                                className={classy(style.arrow, cursor.currentPage === totalPages && style.disabled)}
                                onClick={() => {
                                    onPageChange(cursor.currentPage + 1);
                                }}
                            />
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}
