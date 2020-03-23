const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    less: true,
    typescript: true
  })
  // ...other svelte options
};
