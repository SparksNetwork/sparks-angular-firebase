import { ProjectPage } from "./project.po";
import { browser } from "protractor/built";

var firebaseAccessHandler = require('../setup/firebaseAccess');

describe("Project LC tests", () => {
    let page: ProjectPage;

    beforeAll(() => {
        firebaseAccessHandler.loadFile('./e2e/project_page_tests/test_files/LCOriginal.json', "project");
    });

    afterAll(() => {
        firebaseAccessHandler.deleteItemByKey("project", "LCTest");
    });

    beforeEach(() => {
        page = new ProjectPage();
    });

    it('Title shoudld be `Lucidity Crossroads`', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getProjectTitle().then(function (str) { expect(str).toBe("Lucidity Crossroads") });

    });


    it('Navbar-Brand link should be `sparks.network`', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        page.getNavbarBrandLink().then(function (str) { expect(str).toBe("sparks.network") });

    });

    it('Carousel last indicator should display the image:https://placeimg.com/1140/410/animals/grayscale', function () {

        page.navigateTo();
        browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        let lastCarouselIndicator = page.getLastCarouselIndicator();
        lastCarouselIndicator.click();
        page.getCarouselActiveImageDiv().getAttribute('style')
            .then(function (str) { expect(str).toContain('https://placeimg.com/1140/410/animals/grayscale') });


    });


});