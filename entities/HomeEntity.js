const Entity = require("./Entity");
const PostEntity = require("./PostEntity");
let postsList = posts =>
  posts
    .map(post => PostEntity(post))
    .reduce((acc, post) => acc + post.build() + "<br>", "");
let content = posts => `
    <br>
    ${postsList(posts)}
`;
let homeEntity = posts => Entity(content(posts));

module.exports = homeEntity;
