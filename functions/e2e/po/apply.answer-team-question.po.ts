import { browser, by, element } from 'protractor';

export class PickTeamPage {

    getJoinTeamButton() {
        return element.all(by.className('btn btn-block btn-default')).first()
    }

    getPreviousButton() {
        return element.all(by.className('btn btn-block btn-default')).get(1)
    }


}