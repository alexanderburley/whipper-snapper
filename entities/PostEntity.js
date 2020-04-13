const Entity = require("./Entity");

const content = (post) => {
  return `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"><a href="./${post.url}">${post.title}</a></h5>
      <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
      <p class="card-text">${post.content.substr(0, 300)}...</p>
    </div>
  </div>
`;
};

module.exports = (post) => Entity(content(post));
