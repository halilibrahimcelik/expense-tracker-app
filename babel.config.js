module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          verbose: false,
        },
      ],
    ],
  };
};
