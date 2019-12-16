import { Component } from 'react';
export class ScrollLock extends Component {
    componentDidMount() {
        const originalWidth = document.documentElement.getBoundingClientRect().width;
        document.documentElement.style.overflow = 'hidden';
        if (!window.scrollLockEnabled) {
            const newWidth = document.documentElement.getBoundingClientRect().width;
            document.documentElement.style.marginRight = `${newWidth - originalWidth}px`;
            window.scrollLockEnabled = true;
        }
    }
    componentWillUnmount() {
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginRight = '';
        window.scrollLockEnabled = false;
    }
    render() {
        return null;
    }
}
//# sourceMappingURL=ScrollLock.jsx.map