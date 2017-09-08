import { browser, by, element, $$ } from 'protractor';

export class ApplicationShiftPage {

    getNoShiftMessage() {
        return element(by.css('#no-shift-message'))
    }
    getSelectableShifts() {
        return $$('.shift-list li')
    }
}
