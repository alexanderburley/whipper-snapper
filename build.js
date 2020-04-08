const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();
converter.setFlavor('github');
const { join } = require('path');
const dateFormatLength = 'YYYY-MM-DD-'.length;
const { HomeEntity, PageEntity, BlogpostEntity } = require('./entities');

let outDir;
let assetsDir;
let postsDir;
let pagesDir;
let stylesheetsDir;

module.exports = (directory) => {
  outDir = join(directory, 'out/');
  assetsDir = join(directory, 'assets/');
  postsDir = join(directory, 'posts/');
  pagesDir = join(directory, 'pages/');
  stylesheetsDir = join(directory, outDir, assetsDir + 'stylesheets/');
  makeDirectories(directory);
  buildAssets(directory);
  buildHomepage(directory);
  buildBlogPosts(directory);
  buildOtherPages(directory);
};

const buildBlogPosts = (directory) => {
  returnPosts().forEach((post) => {
    fs.writeFileSync(join(outDir, post.url), PageEntity(BlogpostEntity(post).build()).build());
  });
};

const buildHomepage = (directory) => {
  const page = PageEntity(HomeEntity(returnPosts()).build());
  fs.writeFileSync(join(outDir, 'index.html'), page.build());
};

const buildOtherPages = () => {
  fs.readdirSync(pagesDir).forEach((file) => {
    const text = fs.readFileSync(join(pagesDir, file)).toString();
    const html = converter.makeHtml(text);
    const title = file.split('.')[0];
    fs.writeFileSync(join(outDir, `${title}.html`), PageEntity(html).build());
  });
};

const returnPosts = () => {
  return fs.readdirSync(postsDir).map((file) => {
    const fileName = file.split('.')[0];
    const post = {
      title: fileName.substr(dateFormatLength, fileName.length).split('-').join(' '),
      url: `${fileName}.html`,
      date: fileName.substr(0, dateFormatLength - 1),
      content: converter.makeHtml(fs.readFileSync(join(postsDir, file)).toString()),
    };
    return post;
  });
};

const makeDirectories = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
      if (!fs.existsSync(stylesheetsDir)) {
        fs.mkdirSync(stylesheetsDir);
      }
    }
  }
};

const buildAssets = () => {
  const stylesheets = fs.readdirSync(join(assetsDir, 'stylesheets/'));
  stylesheets.forEach((file) => {
    fs.createReadStream(join(assetsDir, 'stylesheets/', file)).pipe(
      fs.createWriteStream(join(outDir, file))
    );
  });
};
