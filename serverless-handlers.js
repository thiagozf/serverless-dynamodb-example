module.exports = () => {
  const glob = require("glob");
  const YAML = require("yamljs");
  const fs = require("fs");

  return glob
    .sync("src/modules/**/*/handlers.yml")
    .map(f => fs.readFileSync(`./${f}`, "utf8"))
    .map(raw => YAML.parse(raw))
    .reduce((result, handler) => Object.assign(result, handler), {});
};
