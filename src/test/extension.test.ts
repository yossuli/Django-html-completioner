import * as vscode from "vscode";
import type { TestFileLocationAndExpectedItems } from "./../types/types";
import { completionItemsTest } from "./utils/testProcess";

const testFileLocationAndExpectedItems: TestFileLocationAndExpectedItems[] = [
  {
    location: "/djangoApp/templates/djangoApp/index.html",
    items: ["test1"],
    color: "green",
  },
  {
    location: "/djangoApp/templates/djangoApp/index2.html",
    items: ["test2"],
    // color: "yellow",
  },
];

suite("Extension Test Suite", async () => {
  vscode.window.showInformationMessage("Start all tests.");
  for (const testFileLocationAndExpectedItem of testFileLocationAndExpectedItems) {
    await completionItemsTest(testFileLocationAndExpectedItem);
  }
});
