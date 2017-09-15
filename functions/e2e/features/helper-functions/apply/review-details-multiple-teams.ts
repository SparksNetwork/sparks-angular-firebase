

import { confirmPage } from '../shared';
import { browser, ExpectedConditions } from 'protractor/built';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { joinATeam } from '../../helper-functions/shared';
import { testSelectedTeamsInformation } from './review-details-common';

const waitTimeout = 7000

function testEditSelectedTeamsInformation(pickTeamPage: PickTeamPage,
    reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    answerTeamQuestionPage: AnswerTeamQuestionPage, oppKey: string,
    fullyloaded: any, projectKey: string) {

    return confirmPage('/apply/' + oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(() => {
            let selectedTeams = reviewApplicationDetailsPage.getSelectedTeamsEditLink()
            browser.wait(ExpectedConditions.presenceOf(selectedTeams),
                waitTimeout, 'On Review-application-details page edit teams was not present')
            return selectedTeams.click()
        }).then(() =>
            confirmPage('/apply/' + oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
        .then(() =>
            joinATeam(pickTeamPage, waitTimeout, oppKey, answerTeamQuestionPage))
        .then(() => {
            let next = pickTeamPage.getNextButton()
            browser.wait(ExpectedConditions.elementToBeClickable(next),
                waitTimeout, 'Next button from Pick-teams page was not clickable')
            return next.click()
        })
        .then(() =>
            testSelectedTeamsInformation(oppKey, fullyloaded, reviewApplicationDetailsPage, projectKey)
        )
}

export function testsReviewDetailsMultipleTeams(pickTeamPage: PickTeamPage,
    reviewApplicationDetailsPage: ReviewApplicationDetailsPage,
    answerTeamQuestionPage: AnswerTeamQuestionPage, oppKey: string,
    fullyloaded: any, projectKey: string) {

    return testEditSelectedTeamsInformation(pickTeamPage, reviewApplicationDetailsPage,
        answerTeamQuestionPage, oppKey, fullyloaded, projectKey)
}

