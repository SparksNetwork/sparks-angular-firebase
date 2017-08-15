import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

xdescribe('Testing the model validation attributes for endDateTime', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });

    it('Test endDateTime @IsDateString() ', () => {
        firebaseAccessHandler.loadFile("./e2e/project/testDataFiles/endDateTimeNotDateString.json", "project");
        browser.sleep(500);
        page.navigateTo();
        browser.sleep(1000);

        browser.manage().logs().get('browser').then(function (browserLogs) {

            let isValidationErrorsStringPresent = false;
            let isPropertyStringPresent = false;
            let isEndDateTimeISOString = false;

            browserLogs.forEach(function (log) {
                if (log.message.includes("Validation Errors:")) {
                    isValidationErrorsStringPresent = true;
                }
                if (log.message.includes("property")) {
                    isPropertyStringPresent = true;
                }
                if (log.message.includes("endDateTime must be a ISOString")) {
                    isEndDateTimeISOString = true;
                }
            });

            expect(isValidationErrorsStringPresent)
                .toBe(true, "String `Validation Errors:` was not present");;
            expect(isPropertyStringPresent)
                .toBe(true, "String `property` was not present");
            expect(isEndDateTimeISOString)
                .toBe(true, "String `endDateTime must be a ISOString` was not present");
           
        });

    });

})
