import { Component } from 'react';
import { addToQueue, isNextInQueue, removeFromQueue } from './queue';
export class Overlay extends Component {
    componentWillMount() {
        addToQueue(this, this.props.type);
    }
    componentWillUnmount() {
        removeFromQueue(this, this.props.type);
    }
    render() {
        const { children } = this.props;
        if (!isNextInQueue(this, this.props.type))
            return null;
        return children;
    }
}
//# sourceMappingURL=Overlay.jsx.map