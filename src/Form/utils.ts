import { Value } from 'slate';

export const convertFromDots = value => {
    const parsedFormValue = {};
    Object.keys(value).forEach((key): void => {
        const splitKey = key.split('.');
        let currentRef = parsedFormValue;
        for (let i = 0, len = splitKey.length; i < len; i++) {
            const currentKey = splitKey[i];
            if (i + 1 === len) {
                currentRef[currentKey] = value[key];
            } else {
                if (typeof currentRef[currentKey] === 'undefined') {
                    currentRef[currentKey] = {};
                }
                currentRef = currentRef[currentKey];
            }
        }
    });

    return parsedFormValue;
};

export const convertToDots = (value, ele = {}, prefix = '', depth = 0) => {
    // don't include arrays
    if (typeof value === 'object' && value !== null && depth < 5 && !value.length && value instanceof Value === false) {
        const keys = Object.keys(value);

        keys.forEach((key): void => {
            const combinedKey = prefix ? `${prefix}.${key}` : key;

            convertToDots(value[key], ele, combinedKey, depth + 1);
        });
    } else if (prefix && prefix.length > 0) {
        ele[prefix] = value; // eslint-disable-line no-param-reassign
    }

    return ele;
};
