import { classy } from '@audentio/utils/src/classy';
import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import { Anchor } from '../Anchor';
import style from './Avatar.scss';
const sizeMap = {
    us: 14,
    xs: 24,
    sm: 36,
    md: 48,
    lg: 64,
};
const maxSizes = {
    md: 23,
    lg: 26,
};
/**
 * Recommended: Pass viewer/org/user as entity
 */
export class Avatar extends Component {
    getEntityAbbreviation(entity) {
        if (entity.__typename === 'EventRoster') {
            if (entity.abbreviation && entity.abbreviation.length)
                return entity.abbreviation;
            if (entity.organization)
                return entity.organization.abbreviation;
        }
        return entity.abbreviation;
    }
    /* get avatar image source */
    getEntityImage(entity) {
        const { size } = this.props;
        if (entity.avatar) {
            // try to get avatar based on size prop (sm:s, md:m)
            // fall back to medium
            if (size === 'stretch' || size === 'lg')
                return entity.avatar.l;
            if (size === 'xs' || size === 'sm' || size === 'us')
                return entity.avatar.s;
            return entity.avatar.m;
        }
        return null;
    }
    getAbbrFontSize(size, abbr) {
        if (!abbr || !abbr.length || size === 'stretch')
            return 14;
        let fontSize = sizeMap[size] / abbr.length;
        if (abbr.length === 1) {
            fontSize /= 1.7;
        }
        if (abbr.length === 2) {
            fontSize /= 1.2;
        }
        return maxSizes[size] ? Math.min(maxSizes[size], fontSize) : fontSize;
    }
    /* get colors for fallback */
    getEntityColors(entity, image) {
        if (image) {
            return {
                backgroundColor: 'transparent',
            };
        }
        if (entity.__typename === 'Organization' && entity.primary_color) {
            // orgs primary color
            return {
                backgroundColor: entity.primary_color,
                color: tinycolor(entity.primary_color).isLight() ? 'rgba(0,0,0,0.85)' : 'white',
            };
        }
        if (entity.avatar_color) {
            return {
                backgroundColor: entity.avatar_color.bgColor,
                color: entity.avatar_color.fgColor,
            };
        }
        if (entity.color) {
            // used by rosters
            return {
                backgroundColor: entity.color,
                color: tinycolor(entity.color).isLight() ? 'rgba(0,0,0,0.85)' : 'white',
            };
        }
        return {
            backgroundColor: 'white',
            color: 'rgba(0,0,0,0.85)',
        };
    }
    render() {
        const { href, onClick, border, outline, size, round, className, entity = {}, getEntityHref } = this.props;
        if (entity) {
            const image = this.getEntityImage(entity);
            const avatar_href = href !== undefined ? href : getEntityHref && getEntityHref(entity);
            const abbr = size === 'us' ? '' : this.getEntityAbbreviation(entity);
            const Element = avatar_href && !onClick ? Anchor : 'span';
            return (
            // @ts-ignore
            <Element href={onClick ? undefined : avatar_href || undefined} onClick={onClick} style={{
                ...this.getEntityColors(entity, image),
                fontSize: this.getAbbrFontSize(size, String(abbr)),
            }} className={classy(style.avatar, border && style.border, round && style.round, image && style.avatar__hasImage, className, style[`size__${size}`], outline && style.avatar__outline)}>
                    {image ? <img key={image} src={image} alt=""/> : abbr}
                </Element>);
        }
        return new Error('<Avatar/> must be provided entity prop');
    }
}
Avatar.defaultProps = {
    size: 'lg',
    round: false,
};
//# sourceMappingURL=Avatar.jsx.map