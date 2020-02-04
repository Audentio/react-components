import { classy } from '@audentio/utils/src/classy';
import { isTouch } from '@audentio/utils/src/isTouch';
import { throttle } from '@audentio/utils/src/throttle';
import React, { Component, Fragment } from 'react';
import style from './MousemoveGlow.scss';

export interface MousemoveGlowProps {
    children: React.ReactElement<any>;
    disabled?: boolean;
}

export class MousemoveGlow extends Component<MousemoveGlowProps> {
    __container: HTMLElement;

    __centerGlow: HTMLElement;

    __wideGlow: HTMLElement;

    public componentDidMount(): void {
        if (this.__container) {
            this.__container.addEventListener('mouseenter', this.mouseEnter);
            this.__container.addEventListener('mouseleave', this.mouseLeave);
        }
    }

    private mouseEnter = (e): void => {
        if (this.__container) {
            this.__container.addEventListener('mousemove', this.mouseMove);
        }
    };

    private mouseLeave = (e): void => {
        if (this.__container) {
            this.__container.removeEventListener('mousemove', this.mouseMove);
        }
    };

    private mouseMove = throttle((e): void => {
        if (this.__container) {
            const bcr = this.__container.getBoundingClientRect();
            const distanceFromLeftEdge = e.x - bcr.left;

            this.__centerGlow.style.transform = `translateX(${distanceFromLeftEdge}px)`;
            this.__wideGlow.style.transform = `translateX(${distanceFromLeftEdge}px)`;
        }
    }, 150);

    public render(): React.ReactNode {
        const { disabled } = this.props;
        const child: any = __DEV__ ? React.Children.only(this.props.children) : this.props.children;

        if (disabled || isTouch()) return this.props.children;

        return React.cloneElement(child, {
            [typeof child.type === 'string' ? 'ref' : 'innerRef']: ref => {
                this.__container = ref;

                if (child.ref) child.ref(ref);
                if (child.props.innerRef) child.props.innerRef(ref);
            },
            className: classy(child.props.className, style.container),
            children: (
                <Fragment>
                    {child.props.children}

                    <div className={style.innerGlowContainer}>
                        <div
                            ref={ref => {
                                this.__wideGlow = ref;
                            }}
                            className={style.wideGlow}
                        />
                    </div>
                    <div
                        ref={ref => {
                            this.__centerGlow = ref;
                        }}
                        className={style.centerGlow}
                    />
                </Fragment>
            ),
        });
    }
}
