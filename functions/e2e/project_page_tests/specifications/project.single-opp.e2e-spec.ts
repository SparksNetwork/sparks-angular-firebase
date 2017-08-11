import { ProjectSingleOppPage } from "../pages/project.single-opp.po";
import { browser } from "protractor/built";

var firebaseAccessHandler = require('../../setup/firebaseAccess');

describe("[ProjectPage] Project with a single oportunity", () => {
    let page: ProjectSingleOppPage;

    beforeAll(() => {
        // firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/KPCTest.json', "project");
        // firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/KPCTestOpp.json', "opp");

    });

    afterAll(() => {
        // firebaseAccessHandler.deleteItemByKey("project", "KPCTest");
        // firebaseAccessHandler.deleteItemByKey("opp", "KPCTest1");
    });

    beforeEach(() => {
        page = new ProjectSingleOppPage();
    });

    it('Title should be `Park Cleanup`', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getProjectTitle().then(function (str) { expect(str).toBe("Park Cleanup") });

    });

    it('The description should be: Make Kellog Park grat again! '
        + 'Help plant, paint, and beautify out community park.', function () {

            page.navigateTo();
            browser.sleep(3000);
            browser.waitForAngularEnabled(false);

            page.getDescriptionText()
                .then(function (str) {
                    expect(str).toMatch('Make Kellog Park grat again!'
                        + ' Help plant, paint, and beautify out community park.')
                });
        });


})