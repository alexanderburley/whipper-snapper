const Entity = require("./Entity");
let content = post => {
  return `
    <div class="container">
      <h1>${post.title}</h1>
      <hr>
      ${post.content}
    </div>
  `;
};

module.exports = post => Entity(content(post));
