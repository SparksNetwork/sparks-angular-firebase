import { element, by, browser } from 'protractor/built';
import { BenefitSegment } from './apply.benefit.segment';

export class CancelApplicationPage extends BenefitSegment {

    navigateTo() {
        return browser.get('/project/LC/opp/LC1/cancel');
    }

    getDismissCancelApplicationButton() {
        return element(by.css('div.bottom-nav')).element(by.css('a.btn.btn-default'))
    }

    getCancelApplicationButton() {
        return element(by.css('div.bottom-nav')).element(by.css('button.btn.btn-default'))
    }

}

