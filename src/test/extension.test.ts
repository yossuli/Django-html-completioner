import * as vscode from "vscode";
import type { CompletionItemsTestCases } from "./../types/types";
import { completionItemsTestInVscode } from "./utils/suites/completionItemsTestInVscode";

const completionItemsTestCases: CompletionItemsTestCases[] = [
  {
    location: "/djangoApp/templates/djangoApp/index.html",
    items: ["test1"],
    color: "green",
  },
  {
    location: "/djangoApp/templates/djangoApp/index2.html",
    items: ["test2_1", "test2_2"],
    color: "yellow",
  },
  {
    location: "/djangoApp/templates/djangoApp/index3.html",
    items: [],
    color: "blue",
  },
];

for (const completionItemsTestCase of completionItemsTestCases) {
  suite("Extension Test Suite", async () => {
    vscode.window.showInformationMessage("Start all tests.");
    completionItemsTestInVscode(completionItemsTestCase);
  });
}
