import * as vscode from "vscode";
import type {
  CompletionItemsTestCases,
  PopupMassageItemsTestCases,
} from "./../types/types";
import { completionItemsTestInVscode } from "./utils/suites/completionItemsTestInVscode";
import { popupMessageTestInVscode } from "./utils/suites/popupMessageTestInVscode";

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
const popupMassageItemsTestCases: PopupMassageItemsTestCases[] = [
  {
    location: "/djangoApp/templates/djangoApp/index.html",
    isCalled: true,
  },
  {
    location: "/djangoApp/templates/djangoApp/index2.html",
    isCalled: true,
  },
  {
    location: "/djangoApp/templates/djangoApp/index3.html",
    isCalled: true,
  },
  {
    location: "/djangoApp/templates/djangoApp/index4.html",
    isCalled: false,
  },
];

for (const completionItemsTestCase of completionItemsTestCases) {
  suite("Extension Test Suite", async () => {
    vscode.window.showInformationMessage("Start all tests.");
    completionItemsTestInVscode(completionItemsTestCase);
  });
}
for (const popupMassageItemsTestCase of popupMassageItemsTestCases) {
  suite("Extension Test Suite", async () => {
    vscode.window.showInformationMessage("Start all tests.");
    popupMessageTestInVscode(popupMassageItemsTestCase);
  });
}
