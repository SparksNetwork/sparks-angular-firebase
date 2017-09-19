import { browser, element, by } from "protractor/built";

export class ShiftPage {

    navigateTo() {
        return browser.get('/apply/LC1/application/LC_ACCEPTED_APP/shift')
    }

    getDateSelect(){
        return element(by.css('select[name=dayfilter]'))
    }

    getShiftsTitle(){
        return element(by.className('you-will-give-got')).all(by.css('ul li'))
    }
    
 

}