module.exports = {
  plugins: [
    require('precss')({}),
    require('autoprefixer')({
      'browsers': [
        '> 0.1%',
        'last 10 versions'
      ]
    })
  ]
};
