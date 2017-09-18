import { element, by } from "protractor/built";

export abstract class ProjectPage {

    abstract navigateTo();

    getProjectTitleElement() {
        return element(by.css('h1.project-title'));
    }

    getLastCarouselIndicator() {
        return element.all(by.css('ol.carousel-indicators li')).last();
    }

    getCarouselActiveImageDiv() {
        return element(by.className('item carousel-item active'))
            .element(by.css('div.item.active'))
            .element(by.css('div.image'));
    }

    getLocationLink() {
        return element(by.className('project-location'))
            .$('a');
    }

    getDescriptionElement() {
        return element(by.className('project-description segment')).$('p');
    }

    getLocationElement() {
        return element(by.className('project-location'))
            .$('a').$('div.text');
    }

    getLocationName() {
        return element(by.className('project-location'))
            .$('a').$('div.text').getText();
    }

    getMaximumKarmaPointsElement() {
        return element(by.css('div.project-karma > div.project-karma-count'));
    }

    getMaximumKarmaPoints() {
        return element(by.css('div.project-karma > div.project-karma-count')).getText();
    }

    getShareKarmaPointsElement() {
        return element(by.id('share-for-karma')).element(by.css('span'));
    }

    getShareKarmaPoints() {
        return element(by.id('share-for-karma')).element(by.css('span')).getText();
    }

    getLinkToEventPage() {
        return element(by.css('div.project-social.row')).$$('a').first();
    }

    getOrganizerDetailsElement() {
        return element(by.className('project-organizer segment'))
            .$('div.row').$('div.col-xs-9');
    }

    getOrganizerDetails() {
        return element(by.className('project-organizer segment'))
            .$('div.row').$('div.col-xs-9').getText();
    }

    getOrganizerImage() {
        return element(by.className('project-organizer segment'))
            .$('div.row').$('div.col-xs-3').$('img.img-circle');
    }

    getDate(){
        return element(by.css('div.project-date h4'))
    }






}