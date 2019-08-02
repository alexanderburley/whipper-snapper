module.exports = (prepend, content, postpend) => {
  return {
    build: function() {
      return this.prepend + this.content + this.postpend;
    },
    prepend,
    content,
    postpend
  };
};
