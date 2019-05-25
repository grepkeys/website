module.exports = {
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-preset-env')({
      autoprefixer: { grid: 'no-autoplace' }
    }),
    require('postcss-sorting'),
  ],
};
