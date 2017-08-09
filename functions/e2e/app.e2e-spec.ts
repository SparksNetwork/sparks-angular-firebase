import { ClientPage } from "./app.po";
var firebaseAccessHandler =  require ('./setup/firebaseAccess');

describe("test", () => {
    let page: ClientPage;

    beforeAll(() => {
        firebaseAccessHandler.loadFile("./e2e/exampleFile.json","Benefits");         
    });

    afterAll(()=>{
      firebaseAccessHandler.deleteLoadedData("Benefits",2,3);
    });

    beforeEach(() => {
        page = new ClientPage();
    });

    it('test ', () => {
        page.navigateTo();
        expect(true).toBe(true);
    });


});