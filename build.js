const fs = require("fs");
const showdown = require("showdown");
const Post = require("./Post");
const Home = require("./Home");
const converter = new showdown.Converter();
converter.setFlavor("github");

const outDir = "./out/";
const assetsDir = "./assets/";
const postsDir = "./posts/";
const stylesheetsDir = outDir + assetsDir + "./stylesheets/";

module.exports = () => {
  mkdir();
  let posts = fs.readdirSync(postsDir);
  let stylesheets = fs.readdirSync(assetsDir + "stylesheets");
  let home = new Home();
  posts.forEach(file => {
    let text = fs.readFileSync(postsDir + file).toString();
    let html = converter.makeHtml(text);
    let title = file.split(".")[0];
    let post = new Post(title);
    fs.writeFileSync(outDir + title + ".html", post.inject(html).build());
    home = home.injectPost(post);
  });

  stylesheets.forEach(file => {
    fs.createReadStream(assetsDir + "stylesheets/" + file).pipe(
      fs.createWriteStream(outDir + file)
    );
  });

  fs.writeFileSync(outDir + "index.html", home.build());
};

const mkdir = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
    if (!fs.existsSync(stylesheetsDir)) {
      fs.mkdirSync(stylesheetsDir);
    }
  }
};
