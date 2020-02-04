import React, { Component } from 'react';
import style from './Fieldset.scss';
export class Fieldset extends Component {
    render() {
        const { legend, children } = this.props;
        return (<fieldset className={style.fieldset}>
                <legend>{legend}</legend>
                {children}
            </fieldset>);
    }
}
//# sourceMappingURL=Fieldset.jsx.map