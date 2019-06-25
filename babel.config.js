module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: false,
        useBuiltIns: 'entry',
        targets: {
          browsers: [
            "> 5%",
            "not ie < 11"
          ]
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-arrow-functions"
  ]
}
