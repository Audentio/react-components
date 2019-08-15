import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import { number } from 'yup';
import { ActivityIndicator } from '../../ActivityIndicator';
import { Button } from '../../Button';
import { Form } from '../../Form';
import { Icon } from '../../Icon';
import { Input } from '../../Input';
import { Popover } from '../../Popover';
import style from './TablePagination.scss';

export default class TablePagination extends Component<any> {
    state: any = {
        visible: false,
    };

    private renderPageJump = (): React.ReactNode => {
        const { cursor, onPageChange } = this.props;
        const totalPages = cursor && Math.ceil(cursor.total / cursor.perPage);

        return (
            <Form
                onSubmit={({ value }) => {
                    onPageChange(value.page);

                    // hide pageJump popover
                    this.setState({ visible: false });
                }}
            >
                <strong>Jump to page</strong>

                <div>
                    <Input
                        autoFocus
                        className={style.pageJump_input}
                        name="page"
                        type="number"
                        schema={number()
                            .transform(value => (Number.isNaN(value) ? 0 : value))
                            .required()
                            .min(1)
                            .max(totalPages)}
                    />
                    <Button type="submit" kind="primary" icon="arrow-right" />
                </div>
            </Form>
        );
    };

    public render(): React.ReactNode {
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
                                className={classy(style.arrow, cursor.currentPage === 1 && style.disabled)}
                                onClick={() => {
                                    onPageChange(cursor.currentPage - 1);
                                }}
                            >
                                chevron-left
                            </Icon>

                            <Popover
                                className={style.pageJump}
                                position="top"
                                content={this.renderPageJump}
                                onChange={visible => {
                                    this.setState({ visible });
                                }}
                                visible={this.state.visible}
                            >
                                <div className={style.current}>
                                    {cursor.currentPage} of {totalPages}
                                </div>
                            </Popover>

                            <Icon
                                className={classy(style.arrow, cursor.currentPage === totalPages && style.disabled)}
                                onClick={() => {
                                    onPageChange(cursor.currentPage + 1);
                                }}
                            >
                                chevron-right
                            </Icon>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}
