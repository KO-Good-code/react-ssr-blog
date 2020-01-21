require("asset-require-hook")({
  extensions: ["svg", "css", "scss", "jpg", "png", "gif"],
  name: '/static/media/[name].[ext]'
});
require("babel-core/register")();
require("babel-polyfill");
require("./app");