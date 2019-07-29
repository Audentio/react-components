import { Component } from 'react';
import { addToQueue, isNextInQueue, removeFromQueue } from './queue';

interface OverlayProps {
    type?: string;
}

export class Overlay extends Component<OverlayProps> {
    componentDidMount() {
        addToQueue(this, this.props.type);
    }

    componentWillUnmount() {
        removeFromQueue(this, this.props.type);
    }

    render() {
        const { children } = this.props;

        if (!isNextInQueue(this, this.props.type)) return null;

        return children;
    }
}
