import * as path from "path";

import { runTests } from "@vscode/test-electron";

const black = "\u001b[30m";
const red = "\u001b[31m";
const green = "\u001b[32m";
const yellow = "\u001b[33m";
const blue = "\u001b[34m";
const magenta = "\u001b[35m";
const cyan = "\u001b[36m";
const white = "\u001b[37m";
const reset = "\u001b[0m";

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");
    console.log(
      `${cyan}extensionDevelopmentPath is ${JSON.stringify(
        extensionDevelopmentPath
      )}${reset}`
    );

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    console.log(
      `${cyan}extensionTestsPath is ${JSON.stringify(
        extensionTestsPath
      )}${reset}`
    );
    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();
