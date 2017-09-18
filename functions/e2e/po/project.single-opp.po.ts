import { browser, by, element } from 'protractor';
import { ProjectPage } from "./project.po";

export class ProjectSingleOppPage extends ProjectPage{

    navigateTo() {
        return browser.get('/project/KPC');
    }

    getFirstBenefitElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).first().element(by.css('snui-card-item'));
    }

    getCommunityBenefit() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).first()
            .element(by.css('snui-card-item'))
            .$$('div.text').first().getText();
    }

    getReceivedKarmaPointsElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(1).element(by.css('snui-card-item'));
    }

    getReceivedKarmaPoints() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(1)
            .element(by.css('snui-card-item'))
            .$$('h4').first().getText();
    }

    getBenefitElement() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2).element(by.css('snui-card-item'));
    }

    getBenefitTitle() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('h4').first().getText();

    }

    getBenefitDescription() {
        return element.all(by.className('you-get-give-join segment')).first()
            .$('ul').all(by.css('li')).get(2)
            .element(by.css('snui-card-item'))
            .$$('div.text').first().getText();

    }

    getContribElement() {
        return element.all(by.className('you-get-give-join segment')).get(1)
            .$('ul').all(by.css('li')).get(0).element(by.css('snui-card-item'));
    }

    getJoinButton(){
        return element(by.className('btn btn-bordered'));
    }

}