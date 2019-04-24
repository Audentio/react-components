import { cookies } from '@audentio/utils/src/cookies';
import { format as formatTime, formatDistance, formatRelative } from 'date-fns';
import React, { Component } from 'react';

export interface TimestampProps {
    className?: string;

    /**
     * Valid date string or object
     * new Date() / UNIX time / ISO 8601 / (deprecated) RFC2822
     */
    children: string | Date;

    /**
     * Custom date format
     * https://date-fns.org/v2.0.0-alpha.6/docs/format
     *
     * @example format="MMMM Do, YYYY" // (May 7th, 2018)
     */
    format?: string;

    /**
     * Output type (overrides format prop)
     * - **relative**: "4 days ago", "about one year ago"
     * - **calendar**: "Sunday at 04:30 a.m.", "12/31/2017"
     * - **absolute**: "January 15th 2018, 5:30 pm"
     */
    output?: 'relative' | 'calendar' | 'absolute';

    /**
     * Format Options
     * https://date-fns.org/v2.0.0-alpha.6/docs/Options
     */
    formatOptions?: Object;

    /**
     * Live update timestamp
     * defaults to true when output is defined
     */
    liveUpdate?: boolean;

    /**
     * Return string without wrapping element
     * when true, className will have no effect
     */
    noWrap?: boolean;
}

let formattedOffset;
function getFormattedOffset() {
    if (!formattedOffset) {
        const d = new Date();
        const hours = Math.floor(-d.getTimezoneOffset() / 60);
        const minutes = -d.getTimezoneOffset() % 60;

        formattedOffset = `${hours < 0 ? '-' : '+'}${hours}:${minutes}`;
    }

    return formattedOffset;
}

let savedTimezone;
let timezone_read = false;

function handleTimezone(formattedTime) {
    if (timezone_read) {
        savedTimezone = cookies.getItem('timezone');
        timezone_read = true;
    }

    let userTimezone;

    try {
        userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
        // no Intl :(
    }

    if (savedTimezone !== userTimezone) {
        // TODO: @tushar fix
        // return `${formattedTime} (UTC ${getFormattedOffset()})`;
    }

    return formattedTime;
}

type FormatOptions = {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    additionalDigits?: 0 | 1 | 2;
    locale?: Locale;
    includeSeconds?: boolean;
    addSuffix?: boolean;
    unit?: 's' | 'm' | 'h' | 'd' | 'M' | 'Y';
    roundingMethod?: 'floor' | 'ceil' | 'round';
};

/**
 * Render date string/object as timestamp
 *
 * @example Render a relative timestamp with live updates
 * <Timestamp output="relative" liveUpdate>{new Date('Mon May 03 2018 05:41:46')}</Timestamp>
 *
 * @example Render timestamp with custom format
 * <Timestamp format="hh:mm DD/MM/YYYY">Mon May 03 2018 05:41:46</Timestamp>
 */
export class Timestamp extends Component<TimestampProps> {
    _timer: number;

    static format = (date: string | Date | number, format: string, options?: FormatOptions) =>
        handleTimezone(formatTime(date, format, options));

    static defaultProps = {
        format: 'MMMM Do YYYY, h:mm a',
        formatOptions: {},
    };

    componentDidMount() {
        const { output, liveUpdate } = this.props;

        let shouldLiveUpdate = output === 'relative';

        if (typeof liveUpdate === 'boolean') {
            shouldLiveUpdate = liveUpdate;
        }

        if (shouldLiveUpdate) {
            this.startUpdating();
        }
    }

    componentWillUnmount() {
        this.stopUpdating();
    }

    startUpdating() {
        this._timer = window.setInterval(() => {
            this.forceUpdate();
        }, 60 * 1000);
    }

    stopUpdating() {
        clearInterval(this._timer);
    }

    format(time: string | Date): string {
        const { output, format, formatOptions } = this.props;

        const baseDate = new Date();

        if (output) {
            switch (output) {
                case 'calendar':
                    return handleTimezone(formatRelative(time, baseDate, formatOptions));
                case 'relative':
                    return formatDistance(time, baseDate, Object.assign({ addSuffix: true }, formatOptions));

                // absolute by default
                default:
                    return handleTimezone(formatTime(time, 'MMMM Do YYYY, h:mm a'));
            }
        }

        return handleTimezone(formatTime(time, format, formatOptions));
    }

    render() {
        const { children, className, noWrap } = this.props;

        const time_abs = formatTime(children, 'MMMM Do YYYY, h:mm a');

        if (noWrap) {
            return this.format(children);
        }

        return (
            <span className={className} title={time_abs}>
                {this.format(children)}
            </span>
        );
    }
}
