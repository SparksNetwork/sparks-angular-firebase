import { browser } from "protractor/built";
import { ProjectPage } from "../project.po";
var firebaseAccessHandler = require('../../setup/firebaseAccess');

describe('Testing the model validation attributes for images', () => {
    let page: ProjectPage;

    beforeEach(() => {
        page = new ProjectPage();
    });

    afterEach(() => {
        firebaseAccessHandler.deleteLoadedData("project", 1, 1);
        browser.sleep(500);
    });


    //validation logic not implemented yet
    // it('Test images @IsUrl() ', () => {

    // });


})