import { Sentry } from '@audentio/utils/src/Sentry';

// Overlay queue
// decided to keep it super simple for now
// if we ever need queue priority we can probably rewrite keeping the same surface API
// -------------
let instances = [];

// called on mount
// keeps track of active overlay
export function addToQueue(instance) {
    instances.push({ instance });
}

// called when overlay is closed
export function removeFromQueue(instance) {
    // remove this instance from queue
    instances = instances.filter(entry => instance !== entry.instance);

    // update next item in queue
    if (instances.length) {
        // who knows, anything can happen
        try {
            instances[0].instance.forceUpdate();
        } catch (e) {
            Sentry.captureException(e);
        }
    }
}

// return true if there's nothing in queue or if given entry is first in queue
export function isNextInQueue(instance) {
    return instances.length === 0 || instances[0].instance === instance;
}
