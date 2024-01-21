import * as vscode from "vscode";
import type { TestFileLocationAndExpectedItems } from "../types/types";
import { consoleColorLog } from "../utils/consoleColorLog";
import { testProcess } from "./utils/testProcess";

const testFileLocationAndExpectedItems: TestFileLocationAndExpectedItems[] = [
  {
    location: "/djangoApp/templates/djangoApp/index.html",
    item: "test1",
    color: "green",
  },
  {
    location: "/djangoApp/templates/djangoApp/index2.html",
    item: "test2",
    // color: "yellow",
  },
];

suite("Extension Test Suite", async () => {
  vscode.window.showInformationMessage("Start all tests.");
  await testProcess(testFileLocationAndExpectedItems[0]);
  consoleColorLog("test1", "green");
  await testProcess(testFileLocationAndExpectedItems[1]);
  consoleColorLog("test2", "yellow");
});
