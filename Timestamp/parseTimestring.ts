export function parseTimestring(time: any) {
    if (typeof time === 'string') return new Date(time);

    return time;
}
