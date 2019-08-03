const Entity = require("./Entity");
let postsList = posts =>
  posts.reduce((acc, post) => acc + post.build() + "<br>", "");
let content = posts => `
    <br>
    <h1>The Blog</h1>
    <hr>
    ${postsList(posts)}
`;
let homeEntity = posts => Entity(content(posts));

module.exports = homeEntity;
