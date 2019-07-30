import React from 'react';
import lolex from 'lolex';
import { shallow, mount } from 'enzyme';
import { Timestamp } from './Timestamp';

describe('<Timestamp>', () => {
    test('Custom format', () => {
        const now = new Date();
        const rendered = shallow(<Timestamp format="M D yyyy">{new Date()}</Timestamp>);

        expect(rendered.text()).toBe(`${now.getMonth() + 1} ${now.getDate()} ${now.getFullYear()}`);
    });

    test('Format relative time', () => {
        const now = shallow(<Timestamp output="relative">{new Date()}</Timestamp>);

        const lastweek = shallow(
            <Timestamp output="relative">{new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}</Timestamp>
        );

        expect(now.text()).toBe('less than a minute ago');
        expect(lastweek.text()).toBe('7 days ago');
    });

    test('render text without wrapper (noWrap prop)', () => {
        const stamp = shallow(
            <Timestamp noWrap output="relative">
                {new Date()}
            </Timestamp>
        );

        expect(stamp.find('span').length).toBe(0);
        expect(stamp.text()).toBe('less than a minute ago');
    });

    test('live update relative timestamps', () => {
        const clock = lolex.install({ now: Date.now() });

        const stamp = mount(<Timestamp output="relative">{new Date()}</Timestamp>);

        expect(stamp.text()).toBe('less than a minute ago');

        // Fast-forward 1 minute
        clock.tick('01:00');
        expect(stamp.text()).toBe('1 minute ago');

        // Fast-forward 2 minutes
        clock.tick('01:00');
        expect(stamp.text()).toBe('2 minutes ago');

        // Fast-forward 30 minutes
        clock.tick('28:00');
        expect(stamp.text()).toBe('30 minutes ago');
    });
});
