import { Component } from 'react';
import { addToQueue, isNextInQueue, removeFromQueue } from './queue';

export class Overlay extends Component {
    componentDidMount() {
        addToQueue(this);
    }

    componentWillUnmount() {
        removeFromQueue(this);
    }

    render() {
        const { children } = this.props;

        if (!isNextInQueue(this)) return null;

        return children;
    }
}
