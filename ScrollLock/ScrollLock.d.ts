import { Component } from 'react';
declare global {
    interface Window {
        scrollLockEnabled: boolean;
    }
}
export declare class ScrollLock extends Component<any> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
