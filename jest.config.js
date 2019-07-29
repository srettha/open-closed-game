module.exports = {
    rootDir: './',
    coveragePathIgnorePatterns: [
        'node_modules/',
        'src/tests/',
        'src/typings/'
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
