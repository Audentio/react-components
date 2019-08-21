module.exports = {
    globals: {
        __DEV__: false,
        __BROWSER__: true,
    },
    testURL: 'http://localhost',
    setupFiles: ['<rootDir>/jest/setup.js'],
    transform: {
        '^.+\\.(t|j)sx?$': 'babel-jest',
        '^.+\\.js?$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src', '<rootDir>'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@audentio)'],
    testPathIgnorePatterns: ['node_modules', 'cypress'],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'identity-obj-proxy',
        '^.+\\.(png|svg|ico|jpg|jpeg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/internals/jest/fileTransformer.js',
    },
};
