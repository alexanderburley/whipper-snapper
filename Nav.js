module.exports = {
  brand: {
    text: "AB",
    value: "./index.html"
  },
  links: [
    {
      text: "Home",
      value: "./index.html"
    },
    {
      text: "About Me",
      value: "./about.html"
    },
    {
      text: "Contact",
      value: "./contact.html"
    },
    {
      text: "My Setup",
      value: "./my-dev-setup.html"
    }
  ],
  build: function() {
    return (
      preNav +
      this.links.reduce((acc, currVal) => {
        return `${acc}\n
        <li class="nav-item">
          <a class="nav-link" href="${currVal.value}">${currVal.text}</a>
        </li>`;
      }, "") +
      postNav
    );
  }
};

const preNav = `  <nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="#">Navbar</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav mr-auto">`;

const postNav = `
</ul>
    </div>
  </nav>
`;
