import { Component } from 'react';
import { addToQueue, isNextInQueue, removeFromQueue } from './queue';

interface OverlayProps {
    type?: string;
}

export class Overlay extends Component<OverlayProps> {
    componentWillMount() {
        addToQueue(this, this.props.type);
    }

    componentWillUnmount() {
        removeFromQueue(this, this.props.type);
    }

    public render(): React.ReactNode {
        const { children } = this.props;

        if (!isNextInQueue(this, this.props.type)) return null;

        return children;
    }
}
