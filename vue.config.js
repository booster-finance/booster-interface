module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/_variables.sass";@import "@/sass/_mixins.sass";`,
      },
    },
  },
};
