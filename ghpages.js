var ghpages = require('gh-pages')

ghpages.publish('dist', {
  add: true,
  dotfiles: true
}, function (err) {
  if (err) {
    console.log(err)
  }
});