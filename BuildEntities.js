const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
converter.setFlavor("github");

const outDir = "./out/";
const assetsDir = "./assets/";
const postsDir = "./posts/";
const stylesheetsDir = outDir + assetsDir + "./stylesheets/";

let PostEntity = require("./PostEntity");
let HomeEntity = require("./HomeEntity");
let PageEntity = require("./PageEntity");
let BlogpostEntity = require("./BlogpostEntity");

module.exports = () => {
  makeDirectories();
  buildAssets();
  buildHomepage();
  buildBlogPosts();
};

const buildBlogPosts = () => {
  fs.readdirSync(postsDir).forEach(file => {
    let text = fs.readFileSync(postsDir + file).toString();
    let html = converter.makeHtml(text);
    let title = file.split(".")[0];
    fs.writeFileSync(
      outDir + title + ".html",
      PageEntity(BlogpostEntity(title, html).build()).build()
    );
  });
};

const buildHomepage = () => {
  let page = PageEntity(HomeEntity(returnPosts()).build());
  fs.writeFileSync(outDir + "index.html", page.build());
};

const returnPosts = () => {
  return fs.readdirSync(postsDir).map(file => {
    let title = file.split(".")[0];
    return PostEntity(title);
  });
};

const makeDirectories = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
    if (!fs.existsSync(stylesheetsDir)) {
      fs.mkdirSync(stylesheetsDir);
    }
  }
};

const buildAssets = () => {
  let stylesheets = fs.readdirSync(assetsDir + "stylesheets");
  stylesheets.forEach(file => {
    fs.createReadStream(assetsDir + "stylesheets/" + file).pipe(
      fs.createWriteStream(outDir + file)
    );
  });
};
