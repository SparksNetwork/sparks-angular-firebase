import { browser, element, by, ElementFinder } from "protractor/built";

export class ShiftPage {

    navigateTo() {
        return browser.get('/apply/LC1/shift')
    }

    getShiftsTitle(shift: ElementFinder) {
        return shift.element(by.css('h4'))
    }

    getShiftTimeInterval(shift: ElementFinder) {
        return shift.element(by.className('timeline-when'))
    }

    getAllShifts() {
        return element.all(by.css('div.you-will-give-got li div.description'))
    }

    getDateSelect() {
        return element(by.css('select[name=dayfilter]'))
    }

    getOption(select: ElementFinder, index: number) {
        return select.all(by.css('option')).get(index)
    }

    getAllOptions(select: ElementFinder) {
        return select.all(by.css('option'))
    }

    getTeamSelect() {
        return element(by.css('select[name=teamfilter]'))
    }

    getClearAllButton(){
        return element(by.css('div.segment-title-link-container a'))
    }




}