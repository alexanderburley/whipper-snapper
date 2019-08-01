const Entity = require("./Entity");

let prepend = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
`;

let postpend = `
      </ul>
    </div>
  </nav>
`;

let content = navigation =>
  navigation.items.reduce((acc, item) => {
    return `
    ${acc}\n
    <li class="nav-item">
      <a class="nav-link" href="${item.value}">${item.text}</a>
    </li>
  `;
  }, "");

module.exports = navigation => Entity(prepend, content(navigation), postpend);
