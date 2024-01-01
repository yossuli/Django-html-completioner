import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/test/**/*.test.js",
  workspaceFolder: "./test-workspace",
  mocha: {
    ui: "tdd",
    timeout: 20000,
    color: true,
  },
  // launchArgs: [
  //   path.resolve(
  //     __dirname,
  //     "../../test-workspace/testApp/templates/testApp/index.html"
  //   ),
  // ],
});
