import { browser, by, element } from 'protractor';

export class ProjectSingleOppPage {

    navigateTo() {
        return browser.get('/project/KPC');
    }

    getProjectTitleElement() {
        return element(by.css('h1.event-title'));
    }

    getLastCarouselIndicator() {
        return element.all(by.css('ol.carousel-indicators li')).last();
    }

    getDescriptionElement() {
        return element(by.className('event-description segment')).$('p');
    }

    getCarouselActiveImageDiv() {
        return element(by.className('item carousel-item active'))
            .element(by.css('div.item.active'))
            .element(by.css('div.item'));
    }

    getLocationLink() {
        return element(by.className('event-date-location segment'))
            .element(by.css('project-project-location')).$$('a').first();
    }

    getLocationElement() {
        return element(by.className('event-date-location segment'))
            .element(by.css('project-project-location')).$$('a').first().$('div.text');
    }
    getLocationName() {
        return element(by.className('event-date-location segment'))
            .element(by.css('project-project-location')).$$('a').first().$('div.text').getText();
    }

    getMaximumKarmaPointsElement() {
        return element(by.css('div.event-karma > div.event-karma-count'));
    }

    getMaximumKarmaPoints() {
        return element(by.css('div.event-karma > div.event-karma-count')).getText();
    }

    getShareKarmaPointsElement() {
        return element(by.id('share-for-karma')).element(by.css('span'));
    }

    getShareKarmaPoints() {
        return element(by.id('share-for-karma')).element(by.css('span')).getText();
    }

    getLinkToEventPage() {
        return element(by.css('div.page-social.row')).$$('a').first();
    }

    getOrganizerDetailsElement() {
        return element(by.className("project-organizer segment"))
            .$('div.row').$('div.col-xs-9 .organizedby');
    }

    getOrganizerDetails() {
        return element(by.className("project-organizer segment"))
            .$('div.row').$('div.col-xs-9 .organizedby').getText();
    }

    getOrganizerImage() {
        return element(by.className("project-organizer segment"))
            .$('div.row').$('div.col-xs-3').$('img.img-circle');
    }

    getFirstBenefitElement() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).first().element(by.css('snui-card-item'));
    }

    getCommunityBenefit() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first().getText();
    }

    getReceivedKarmaPointsElement() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).get(1).element(by.css('snui-card-item'));
    }

    getReceivedKarmaPoints() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).get(1)
            .element(by.css('snui-card-item'))
            .$$('h4').first().getText();
    }

    getBenefitElement() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).get(2).element(by.css('snui-card-item'));
    }

    getBenefitTitle() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('h4').first().getText();

    }

    getBenefitDescription() {
        return element.all(by.className('you-will-give-got segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('div.text').first().getText();

    }

    getContribElement() {
        return element.all(by.className('you-will-give-got segment')).get(1)
            .$('ul').all(by.css('li')).get(0).element(by.css('snui-card-item'));
    }



}