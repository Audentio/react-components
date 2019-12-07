/* eslint-disable */

declare module '*.scss' {
    const obj: { [key: string]: string };
    export default obj;
}

declare const __image__: string;

declare module '*.png' {
    export default __image__;
}

declare module '*.jpg' {
    export default __image__;
}

declare module '*.svg' {
    export default __image__;
}

declare module '*.jpeg' {
    export default __image__;
}

/**
 * Remove keys from interface
 *
 * e.g. `Omit<MyInterface, 'unwantedKey'>`
 * */
type Weaken<T, K extends keyof T> = { [P in keyof T]?: P extends K ? any : T[P] };
type ComposeProps<T, K extends keyof T> = { [P in keyof T]?: T[P] };

/* eslint-disable no-unused-vars, no-use-before-define */
declare const __DEV__: boolean;
declare const __BROWSER__: boolean;
declare const __VERSION__: string;

// global types
type gqlCursor = {
    total: number;
    perPage: number;
    currentPage: number;
    hasPages: boolean;
};
