/* eslint-disable */
const yaml = require("yamljs");
const fs = require("fs");
// const { CLOUDFORMATION_SCHEMA } = require("cloudformation-js-yaml-schema");

module.exports = async () => {
  const cf = yaml.parse(
    fs.readFileSync("./resources/dynamodb-table.yml", "utf8")
  );

  var tables = [];
  Object.keys(cf.Resources).forEach(item => {
    tables.push(cf.Resources[item]);
  });

  tables = tables
    .filter(r => r.Type === "AWS::DynamoDB::Table")
    .map(r => {
      let table = r.Properties;
      table.TableName = "local-way-pages-api-table";
      delete table.TimeToLiveSpecification; // errors on dynamo-local
      return table;
    });

  return {
    tables,
    port: 8000
  };
};
