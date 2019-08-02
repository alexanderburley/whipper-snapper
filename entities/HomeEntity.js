const Entity = require("./Entity");
let postsList = posts => posts.reduce((acc, post) => acc + post.build(), "");
let content = posts => `
  <br>
  <div class="container">
    <h1>The Blog</h1>
    <hr>
    ${postsList(posts)}
  </div>
`;
let homeEntity = posts => Entity(content(posts));

module.exports = homeEntity;
