module.exports = (content) => {
  return {
    build() {
      return this.content;
    },
    content,
  };
};
