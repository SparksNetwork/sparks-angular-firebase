import 'jasmine' // to clear lint errors
import { browser, element, by, ExpectedConditions } from 'protractor'
import { setData, updateData, setUsers } from '../../firebase'
import { GuestHomePage } from "../../po/guest-home.po";


describe('Guest home page: user is not logged in', () => {
    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    let page: GuestHomePage;

    beforeAll(done => {
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(() => setData('/', fullyLoaded))
            .then(done)
        page = new GuestHomePage();
    })
    describe('exploring the project page', () => {
        beforeAll(() => {
            page.navigateTo()
        })


    })

})
