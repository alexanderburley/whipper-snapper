module.exports = content => {
  return {
    build: function() {
      return this.content;
    },
    content
  };
};
