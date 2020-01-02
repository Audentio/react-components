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
     * @example format="MMMM do, yyyy" // (May 7th, 2018)
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
declare type FormatOptions = {
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
 * <Timestamp format="hh:mm dd/MM/yyyy">Mon May 03 2018 05:41:46</Timestamp>
 */
export declare class Timestamp extends Component<TimestampProps> {
    _timer: number;
    static format: (date: string | number | Date, format: string, options?: FormatOptions) => any;
    static defaultProps: {
        format: string;
        formatOptions: {};
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    startUpdating(): void;
    stopUpdating(): void;
    format(time: string | Date): string;
    render(): React.ReactNode;
}
export {};
