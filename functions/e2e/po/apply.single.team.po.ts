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

    getAvailableTeamLink(teamIndex: number) {
        return element.all(by.css('apply-opp-teams-not-selected a')).get(teamIndex)
    }

    getAvailableTeamTitle(teamLink: ElementFinder) {
        return teamLink.element(by.css('div.team-item.segment div.text h4'))
    }

    getAvailableTeamIcon(teamLink: ElementFinder) {
        return teamLink.element(by.css('div.team-item.segment div.icon span'))
    }

    getSelectedTeams() {
        return element.all(by.css('div.selected-team-list div.selected-team-item'))
    }
    getSelectedTeam(teamIndex: number) {
        return element.all(by.css('div.selected-team-list div.selected-team-item'))
            .get(teamIndex)
    }

    getSelectedTeamTitle(team: ElementFinder) {
        return team.element(by.css('h4'))
    }

    getDeleteButtton(team: ElementFinder){
       return team.element(by.css('a'))
    }

    getDeleteAllButton(){
        return element.all(by.css('div.segment-title-link-container')).first().element(by.css('a'))
    }

}