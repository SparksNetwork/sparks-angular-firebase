import { browser, by, element } from 'protractor';
import { BenefitSegment } from './apply.benefit.segment';

export class OpportunityPage extends BenefitSegment {

    navigateTo() {
        return browser.get('project/LC/opp/LC1');
    }

    getTitleElement() {
        return element(by.css('div.opp-head h2'));
    }

    getDiscountElement() {
        return element(by.id('dropdownMenuOpportunity'));
    }

    getSecondDiscount() {
        return element(by.className('dropdown opp-selector open')).$$('li').get(1);
    }

    getBenefitContribElement() {
        return element(by.css('project-opp-detail'))
            .all(by.css('div.row')).first()
            .element(by.css('div.col-xs-12 h4'));
    }

    getContribElement() {
        return element.all(by.className('you-get-give-join segment')).get(1)
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first();
    }

    getContribTitle() {
        return element.all(by.className('you-get-give-join segment')).get(1)
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('h4').getText();
    }

    getContribDescription() {
        return element.all(by.className('you-get-give-join segment')).get(1)
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('p').getText();
    }

    getExtendElement() {
        return element(by.className('list-other collapse in show')).$('div.icon');
    }

    getHiddenTeams() {
        return element.all(by.className('you-get-give-join segment')).get(2)
            .all(by.css('ul')).get(1).all(by.css('li'));
    }

    getCollapseLink() {
        return element.all(by.className('you-get-give-join segment')).get(2)
            .all(by.css('ul')).get(1).all(by.css('li')).last();
    }

    getFirstTeam() {
        return element.all(by.className('you-get-give-join segment')).get(2)
            .all(by.css('ul')).get(0).all(by.css('li')).first();
    }

    getButton() {
        return element(by.className('btn btn-bordered btn-block'))
    }


}