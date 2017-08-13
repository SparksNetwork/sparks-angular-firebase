import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

describe('Testing the model validation attributes for description', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

    it('Test description @IsNotEmpty() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/descriptionEmpty.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isDescriptionEmptyStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("description should not be empty")) {
                    isDescriptionEmptyStringPresent = true;
                }
             
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isDescriptionEmptyStringPresent)
                .toBe(true, "String `description should not be empty` was not present");
   
        });

    });

     it('Test description @IsDefined() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/descriptionUndefined.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isDescriptionUndefinedStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("description should not be null or undefined")) {
                    isDescriptionUndefinedStringPresent = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isDescriptionUndefinedStringPresent)
                .toBe(true, "String `description should not be null or undefined` was not present");
           
        });

    });

})