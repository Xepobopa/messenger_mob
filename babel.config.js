module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                envName: 'APP_ENV',
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
                verbose: false,
            },
        ],
        [
            'module-resolver',
            {
                alias: {
                    src: './src',
                    '@assets': './src/assets',
                    '@components': './src/components',
                    '@navigation': './src/navigation',
                    '@common': './src/common',
                },
            },
        ],
    ],
};
