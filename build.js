const fs = require("fs");
const showdown = require("showdown");
const Post = require("./Post");
const Home = require("./Home");
const converter = new showdown.Converter();
converter.setFlavor("github");

const outDir = "./out/";

module.exports = () => {
  mkdir();
  let files = fs.readdirSync("./posts");
  let home = new Home();
  files.forEach(file => {
    let text = fs.readFileSync("./posts/" + file).toString();
    let html = converter.makeHtml(text);
    let title = file.split(".")[0];
    let post = new Post(title);
    fs.writeFileSync("./out/_" + title + ".html", post.inject(html).build());
    home = home.injectPost(post);
  });
  fs.writeFileSync("./out/_index.html", home.build());
};

const mkdir = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync("./out/");
  }
};
