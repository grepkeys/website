module.exports = {
  plugins: [
    require("cssnano")({
      preset: 'default',
    }),
    require("css-declaration-sorter"),
    require("postcss-preset-env")({
      autoprefixer: { grid: "no-autoplace" }
    }),
  ],
};
