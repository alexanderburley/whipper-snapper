const fs = require('fs');
const showdown  = require('showdown');
const converter = new showdown.Converter();

module.exports = () => {
  var files = fs.readdirSync('./posts');
  files.forEach((file) => {
    let text = fs.readFileSync('./posts/'+file).toString();
    let html = converter.makeHtml(text);
    fs.writeFileSync('./out/_'+file.split('.')[0]+'.html', html);
  })
}