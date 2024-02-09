module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['standard', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Automatically includes the React version
        },
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
        {
            files: ['**/*.js', '**/*.ts', '**/*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // `react` first, `next` second, then packages starting with a character
                            ['^react$', '^next', '^[a-z]'],
                            // Packages starting with `@`
                            ['^@'],
                            // Packages starting with `~`
                            ['^~'],
                            // Imports starting with `../`
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Imports starting with `./`
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports
                            ['^.+\\.s?css$'],
                            // Side effect imports
                            ['^\\u0000'],
                        ],
                    },
                ],
            },
        },
    ],
};
