

import { confirmPage } from '../shared';
import { browser, ExpectedConditions } from 'protractor/built';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';
import { joinATeam } from '../../helper-functions/shared';
import { testSelectedTeamsInformation } from './review-details-common';
import { ParamsObject } from './params-object';

const waitTimeout = 7000

function testEditSelectedTeamsInformation(params:ParamsObject) {

    return confirmPage('/apply/' + params.oppKey + '/application/', '/review-detail', 'Review-application-details', 'first', waitTimeout)
        .then(() => {
            let selectedTeams = params.reviewApplicationDetailsPage.getSelectedTeamsEditLink()
            browser.wait(ExpectedConditions.presenceOf(selectedTeams),
                waitTimeout, 'On Review-application-details page edit teams was not present')
            return selectedTeams.click()
        }).then(() =>
            confirmPage('/apply/' + params.oppKey + '/application/', '/teams', 'Pick-teams', 'first', waitTimeout, '/teams/'))
        .then(() =>
            joinATeam(params.pickTeamPage, waitTimeout, params.oppKey, params.answerTeamQuestionPage))
        .then(() => {
            let next = params.pickTeamPage.getNextButton()
            browser.wait(ExpectedConditions.elementToBeClickable(next),
                waitTimeout, 'Next button from Pick-teams page was not clickable')
            return next.click()
        })
        .then(() =>
            testSelectedTeamsInformation(params)
        )
}

export function testsReviewDetailsMultipleTeams(params:ParamsObject) {

    return testEditSelectedTeamsInformation(params)
}

