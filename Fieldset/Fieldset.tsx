import React, { Component } from 'react';
import style from './Fieldset.scss';

interface FieldsetProps {
    legend: string;
    children: React.ReactNode;
}

export class Fieldset extends Component<FieldsetProps> {
    render() {
        const { legend, children } = this.props;

        return (
            <fieldset className={style.fieldset}>
                <legend>{legend}</legend>
                {children}
            </fieldset>
        );
    }
}
