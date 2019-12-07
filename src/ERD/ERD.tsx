import { classy } from '@audentio/utils/src/classy';
import { debounce } from '@audentio/utils/src/debounce';
import React, { Component } from 'react';
import style from './ERD.scss';

interface ERDChild {
    bcr: ClientRect;
    width: number;
    height: number;
}

interface ERDProps {
    nodeName?: string;
    delay?: number;
    children: (args: ERDChild) => React.ReactNode;
    className?: string;
}

interface ERDState {
    bcr: ClientRect;
}

/**
 * do not include erd in server bundle (crashes on init)
 * will only require and instantiate in browser bundle
 */
let _erd;
if (__BROWSER__) {
    const elementResizeDetectorMaker = require('element-resize-detector');
    _erd = elementResizeDetectorMaker({
        strategy: 'scroll',
    });
}

/**
 * Element Resize Detector
 * listen to width changes on conainer
 *
 * example: <ERD>{({ width }) => (<div>conditionally render here</div>)}</ERD>
 */
export class ERD extends Component<ERDProps, ERDState> {
    __element: HTMLElement;

    static defaultProps = {
        nodeName: 'div',
        delay: 200,
    };

    public state: ERDState = {
        bcr: null,
    };

    public componentDidMount(): void {
        // start listening to resize
        if (_erd) {
            _erd.listenTo(this.__element, this.onElementResize);
        }
    }

    public componentWillUnmount(): void {
        if (_erd) {
            // remove any events in queue
            // @ts-ignore
            this.onElementResize.cancel();

            // stop listening
            _erd.removeListener(this.__element, this.onElementResize);
        }
    }

    // onResize callback
    // debounced to avoid degrading perf during resize
    // to make sure it repaints instantly (not recommended) pass delay={0}
    private onElementResize = debounce(
        (element: HTMLElement): void => {
            const bcr = element.getBoundingClientRect();

            this.setState({
                bcr,
            });
        },
        this.props.delay,
        true
    );

    public render(): React.ReactNode {
        const { children, delay, nodeName, className, ...props } = this.props;
        const { bcr } = this.state;
        const ContainerNode: any = nodeName;

        if (typeof children !== 'function') {
            throw new Error('ERD must have a single function child');
        }

        return (
            <ContainerNode
                className={classy(style.container, className)}
                ref={ref => {
                    this.__element = ref;
                }}
                {...props}
            >
                {children({
                    bcr,
                    width: bcr && bcr.width,
                    height: bcr && bcr.height,
                })}
            </ContainerNode>
        );
    }
}
