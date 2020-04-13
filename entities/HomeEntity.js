const Entity = require("./Entity");
const PostEntity = require("./PostEntity");

const postsList = (posts) =>
  posts.map((post) => PostEntity(post)).reduce((acc, post) => `${acc + post.build()}<br>`, "");
const content = (posts) => `
    <br>
    ${postsList(posts)}
`;
const homeEntity = (posts) => Entity(content(posts));

module.exports = homeEntity;
