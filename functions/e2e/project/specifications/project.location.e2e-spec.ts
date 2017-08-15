import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

xdescribe('Testing the model validation attributes for location', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

     it('Test location @ValidateNested() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/locationNotNested.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isLocationNestedStringPresent = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("Only objects and arrays are supported to nested validation")) {
                    isLocationNestedStringPresent = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isLocationNestedStringPresent)
                .toBe(true, "String `Only objects and arrays are supported to nested validation` was not present");
           
        });

    });




})
