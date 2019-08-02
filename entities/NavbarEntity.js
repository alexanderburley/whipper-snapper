const Entity = require("./Entity");
let content = navigation => `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="${navigation.brand.value}">
      ${navigation.brand.text}
    </a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        ${navItems(navigation)}
      </ul>
    </div>
  </nav>

`;

let navItems = navigation =>
  navigation.items.reduce((acc, item) => {
    return `
    ${acc}\n
    <li class="nav-item">
      <a class="nav-link" href="./${item.value}.html">${item.text}</a>
    </li>
  `;
  }, "");

module.exports = navigation => Entity(content(navigation));
