import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

describe('Testing the model validation attributes for title', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

    it('Test title @IsNotEmpty() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/titleEmpty.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isTitleEmptyStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("title should not be empty")) {
                    isTitleEmptyStringPresent = true;
                }
                
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isTitleEmptyStringPresent)
                .toBe(true, "String `Title should not be empty` was not present");
           
        });

    });

     it('Test title @IsDefined() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/titleUndefined.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isTitleUndefinedStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("title should not be null or undefined")) {
                    isTitleUndefinedStringPresent = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isTitleUndefinedStringPresent)
                .toBe(true, "String `title should not be null or undefined` was not present");
           
        });

    });

})
