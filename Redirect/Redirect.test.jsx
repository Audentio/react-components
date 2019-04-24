import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, StaticRouter, Switch } from 'react-router';
import { Redirect } from './Redirect';

// for MemoryRouter Redirect needs to be inside <Switch> for `from` to work
// `from` is required so we dont redirect twice (otherwise react-router warns)
// not required for StaticRouter as it only renders once

describe('<Redirect>', () => {
    test('Redirect on client', () => {
        __BROWSER__ = true;
        const router = mount(
            <MemoryRouter initialEntries={['/one', '/two']} initialIndex={0}>
                <Switch>
                    <Redirect from="/one" to="/two" />
                </Switch>
            </MemoryRouter>
        );

        expect(router.find('Router').props().history.location.pathname).toBe('/two');
    });

    test('Redirect on client when `to` is location descriptor', () => {
        __BROWSER__ = true;
        const router = mount(
            <MemoryRouter initialEntries={['/one', '/two']} initialIndex={0}>
                <Switch>
                    <Redirect from="/one" to={{ pathname: '/two', search: '?foo=bar' }} />
                </Switch>
            </MemoryRouter>
        );

        expect(router.find('Router').props().history.location.pathname).toBe('/two');
        expect(router.find('Router').props().history.location.search).toBe('?foo=bar');
    });

    test('Signal server redirect (internal path)', () => {
        __BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect to="/two" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
    });

    test('Signal server redirect (external path)', () => {
        __BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect to="https://google.com" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.externalPath).toBe('https://google.com');
        expect(staticContext.location).toBe(undefined);
    });

    test('Signal server redirect when `to` is object', () => {
        __BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect to={{ pathname: '/two', search: '?foo=bar' }} />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
        expect(staticContext.location.search).toBe('?foo=bar');
        expect(staticContext.url).toBe('/two?foo=bar');
    });

    test('Signal server redirect with status', () => {
        __BROWSER__ = false;
        const staticContext = {};

        mount(
            <StaticRouter context={staticContext} location="/one">
                <Redirect statusCode={301} to="/two" />
            </StaticRouter>
        );

        expect(staticContext.action).toBe('REPLACE');
        expect(staticContext.location.pathname).toBe('/two');
        expect(staticContext.statusCode).toBe(301);
    });
});
