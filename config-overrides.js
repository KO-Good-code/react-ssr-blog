const { override, addWebpackAlias } = require('customize-cra');

process.env.GENERATE_SOURCEMAP = "false";

const imgFun = () => config => {
  // ...add your webpack config
    // console.log(JSON.stringify(config));
    // 去掉hash值，解决asset-require-hook资源问题
    config.module.rules.forEach(d => {
      d.oneOf &&
        d.oneOf.forEach(e => {
          if (e && e.options && e.options.name) {
            e.options.name = e.options.name.replace('[hash:8].', '');
          }
        });
    });
    config.plugins[0].options.env = process.env.NODE_ENV
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        "react": "React",
        "react-dom": "ReactDOM",
        "axios": "axios"
      }
      config.plugins[0].options.minify = {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }
    return config;
}

module.exports = {
  webpack: override(
    imgFun(),
    addWebpackAlias({
      ["@"]: require('path').resolve(__dirname, "src"),
    })
  )
};