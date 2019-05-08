module.exports = {
  plugins: [
    require("autoprefixer")({
      grid: "no-autoplace",
    }),
    require("cssnano")({
      preset: 'default',
    }),
    require("css-declaration-sorter"),
    require("postcss-preset-env"),
  ],
};
