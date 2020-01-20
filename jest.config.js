module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".test.ts$",
  collectCoverageFrom: ["**/*.ts"],
  coverageDirectory: "../coverage",
  coverageReporters: ["json", "text", "text-summary", "lcov"],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90
  //   }
  // },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1"
  },
  globalSetup: "./node_modules/@shelf/jest-dynamodb/setup.js",
  globalTeardown: "./node_modules/@shelf/jest-dynamodb/teardown.js",
  testEnvironment: "./node_modules/@shelf/jest-dynamodb/environment.js",
  runner: "groups"
};
