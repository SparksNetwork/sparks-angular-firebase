import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

xdescribe('Testing the model validation attributes for startDateTime', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

    it('Test startDateTime @IsDateString() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/startDateTimeNotDateString.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isStartDateTimeISOString = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("startDateTime must be a ISOString")) {
                    isStartDateTimeISOString = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isStartDateTimeISOString)
                .toBe(true, "String `startDateTime must be a ISOString` was not present");
           
        });

    });

     it('Test startDateTime @IsDefined() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/startDateTimeUndefined.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isStartDateTimeUndefinedStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("startDateTime should not be null or undefined")) {
                    isStartDateTimeUndefinedStringPresent = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isStartDateTimeUndefinedStringPresent)
                .toBe(true, "String `startDateTime should not be null or undefined` was not present");
           
        });

    });

})