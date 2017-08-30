import { browser, by, element, ElementFinder } from 'protractor';

export class PickTeamPage {

    getNextButton() {
        return element.all(by.className('btn btn-block btn-default')).get(1)
    }

    getPreviousButton() {
        return element.all(by.className('btn btn-block btn-default')).first()
    }

    getAvailableTeams() {
        return element.all(by.css('apply-opp-teams-not-selected a'))
    }

    getTeamLink(teamIndex: number) {
        return element.all(by.css('apply-opp-teams-not-selected a')).get(teamIndex)
    }

    getTeamTitle(teamLink:ElementFinder) {
        return  teamLink.element(by.css('div.team-item.segment div.text h4'))
    }

}