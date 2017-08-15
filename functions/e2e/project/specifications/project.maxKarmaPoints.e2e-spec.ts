import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

xdescribe('Testing the model validation attributes for maxKarmaPoints', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

    it('Test maxKarmaPoints @IsInt() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/maxKarmaPointsNotInt.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isMaxKarmaPointInt = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("maxKarmaPoints must be an integer number")) {
                    isMaxKarmaPointInt = true;
                }

            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isMaxKarmaPointInt)
                .toBe(true, "String `maxKarmaPoints must be an integer number` was not present");
           
        });

    });

     it('Test maxKarmaPoints @IsDefined() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/maxKarmaPointsUndefined.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isMaxKarmaPointsUndefinedStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("maxKarmaPoints should not be null or undefined")) {
                    isMaxKarmaPointsUndefinedStringPresent = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isMaxKarmaPointsUndefinedStringPresent)
                .toBe(true, "String `maxKarmaPoints should not be null or undefined` was not present");
           
        });

    });

})
