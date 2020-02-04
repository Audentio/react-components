import React, { Component } from 'react';
export default class ModalBox extends Component<any> {
    __node: HTMLElement;
    __nodeInner: HTMLElement;
    static defaultProps: {
        overlay: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    private keyDownListener;
    render(): React.ReactNode;
}
