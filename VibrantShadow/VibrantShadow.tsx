import { classy } from '@audentio/utils/src/classy';
import React from 'react';
import style from './style.scss';

export function VibrantShadow(props) {
    const {
        srcset,
        image,
        className,
        key,
        sizes,
        vibrancy = 1,
        imageClass,
        opacity = 0.9,
        shadowClass,
        radius = 15,
        size = 0.98,
        offset = {},
    } = props;

    if (!image) return null;

    return (
        <div className={classy(style.container, className)}>
            <img
                className={classy(style.image, imageClass)}
                src={image}
                sizes={sizes}
                key={key}
                srcSet={srcset}
                alt=""
            />

            <img
                alt=""
                className={classy(style.shadow, shadowClass)}
                src={image}
                key={key}
                sizes={sizes}
                srcSet={srcset}
                style={{
                    top: offset.top,
                    left: offset.left,
                    opacity,
                    transform: `scale(${size})`,
                    filter: `blur(${radius}px) brightness(90%) saturate(${2 * vibrancy})`,
                }}
            />
        </div>
    );
}
