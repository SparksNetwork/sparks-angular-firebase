import { element, by } from 'protractor/built';

export abstract class BenefitSegment {

    abstract navigateTo();


    getReceivedKarmaPointsElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(1)
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('h4');
    }

    getCommunityBenefitElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('p');
    }

    getBenefitElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('div.text').first();
    }

    getBenefitTitle() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('h4').getText();
    }

    getBenefitDescription() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('div.text').first().$('p').getText();
    }


}