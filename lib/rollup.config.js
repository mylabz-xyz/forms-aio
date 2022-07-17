alias = require("@rollup/plugin-alias");
buble = require("@rollup/plugin-buble");

module.exports = [
  {
    input: "src/index.js",
    output: {
      file: "dist/forms-aio.esm.js",
      exports: "named",
      format: "es",
      globals: {
        formsAio: "forms-aio",
      },
    },
    plugins: [buble(), alias({})],
    external: ["formsAio"],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/forms-aio.js",
      format: "umd",
      exports: "named",
      name: "FormsAio",
      globals: {
        formsAio: "forms-aio",
      },
    },
    plugins: [buble(), alias({})],
    external: ["formsAio"],
  },
];
