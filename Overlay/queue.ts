import * as Sentry from '@sentry/minimal';

// Overlay queue
// decided to keep it super simple for now
// if we ever need queue priority we can probably rewrite keeping the same surface API
// -------------
let instances = [];
let keyedInstances = {};

const getKey = key => {
    return key || 'default_key';
};

// called on mount
// keeps track of active overlay
export function addToQueue(instance, keyBase = null) {
    const key = getKey(keyBase);

    if (typeof keyedInstances[key] === 'undefined') {
        keyedInstances[key] = [];
    }

    keyedInstances[key].push({ instance });
}

// called when overlay is closed
export function removeFromQueue(instance, keyBase = null) {
    const key = getKey(keyBase);

    // remove this instance from queue
    keyedInstances[key] = keyedInstances[key].filter(entry => instance !== entry.instance);

    // update next item in queue
    if (keyedInstances[key].length) {
        // who knows, anything can happen
        try {
            keyedInstances[key][0].instance.forceUpdate();
        } catch (e) {
            Sentry.captureException(e);
        }
    }
}

// return true if there's nothing in queue or if given entry is first in queue
export function isNextInQueue(instance, keyBase = null) {
    const key = getKey(keyBase);

    return keyedInstances[key].length === 0 || keyedInstances[key][0].instance === instance;
}
