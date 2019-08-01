const Entity = require("./Entity");
// const PostEntity = require("./PostEntity");
// const fs = require("fs");
// const postsDir = "./posts/";

let prepend = `
  <div class="container">
    <h1>The Blog</h1>
    <hr>
`;

let postpend = `
  </div>
`;

let content = posts => posts.reduce((acc, post) => acc + post.build(), "");
let homeEntity = posts => Entity(prepend, content(posts), postpend);

module.exports = homeEntity;