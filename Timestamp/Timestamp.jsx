import { Sentry } from '@audentio/utils/src/Sentry';
import formatTime from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import formatRelative from 'date-fns/formatRelative';
import React, { Component } from 'react';
import { handleTimezone } from './handleTimezone';
import { parseTimestring } from './parseTimestring';
/**
 * Render date string/object as timestamp
 *
 * @example Render a relative timestamp with live updates
 * <Timestamp output="relative" liveUpdate>{new Date('Mon May 03 2018 05:41:46')}</Timestamp>
 *
 * @example Render timestamp with custom format
 * <Timestamp format="hh:mm dd/MM/yyyy">Mon May 03 2018 05:41:46</Timestamp>
 */
export class Timestamp extends Component {
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
    format(time) {
        if (!time) {
            return null;
        }
        try {
            const { output, format, formatOptions } = this.props;
            const baseDate = new Date();
            if (output) {
                switch (output) {
                    case 'calendar':
                        return handleTimezone(formatRelative(parseTimestring(time), baseDate, formatOptions));
                    case 'relative':
                        return formatDistance(parseTimestring(time), baseDate, Object.assign({ addSuffix: true }, formatOptions));
                    // absolute by default
                    default:
                        return handleTimezone(formatTime(parseTimestring(time), 'MMMM do yyyy, h:mm a', {
                            useAdditionalDayOfYearTokens: true,
                            useAdditionalWeekYearTokens: true,
                            ...formatOptions,
                        }));
                }
            }
            return handleTimezone(formatTime(parseTimestring(time), format, {
                useAdditionalDayOfYearTokens: true,
                useAdditionalWeekYearTokens: true,
                ...formatOptions,
            }));
        }
        catch (e) {
            Sentry.captureException(e);
            return 'Invalid Date';
        }
    }
    render() {
        const { children, className, noWrap, formatOptions } = this.props;
        let time_abs;
        try {
            time_abs = formatTime(parseTimestring(children), 'MMMM do yyyy, h:mm a', {
                useAdditionalDayOfYearTokens: true,
                useAdditionalWeekYearTokens: true,
                ...formatOptions,
            });
        }
        catch (e) {
            time_abs = 'Invalid Date';
        }
        if (noWrap) {
            return this.format(children);
        }
        return (<span className={className} title={time_abs}>
                {this.format(children)}
            </span>);
    }
}
Timestamp.format = (date, format, options) => {
    if (!date) {
        return null;
    }
    return handleTimezone(formatTime(parseTimestring(date), format, {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true,
        ...options,
    }));
};
Timestamp.defaultProps = {
    format: 'MMMM do yyyy, h:mm a',
    formatOptions: {},
};
//# sourceMappingURL=Timestamp.jsx.map