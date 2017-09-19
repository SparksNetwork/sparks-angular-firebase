import { ReviewApplicationDetailsEditProfilePage } from '../../../po/apply.review-application-details-edit-profile';
import { ReviewApplicationDetailsPage } from '../../../po/apply.review-application-details.po';
import { ReviewApplicationDetailsEditAnswerPage } from '../../../po/apply.review-application-details-edit-answer.po';
import { AnswerTeamQuestionPage } from '../../../po/apply.answer-team-question.po';
import { AnswerOrganizerQuestionPage } from '../../../po/apply.answer-organizer-question.po';
import { PickTeamPage } from '../../../po/apply.choose.team.po';

export class ParamsObject {

    reviewApplicationDetailsPage: ReviewApplicationDetailsPage;
    reviewApplicationDetailsEditProfilePage: ReviewApplicationDetailsEditProfilePage;
    oppKey: string;
    pickTeamPage: PickTeamPage;
    fullyLoaded: any;
    answerToOrganizerQuestion: string;
    answerTeamQuestionPage: AnswerTeamQuestionPage;
    projectKey: string;
    reviewApplicationDetailsEditAnswerPage: ReviewApplicationDetailsEditAnswerPage;
    answerOrganizerQuestionPage: AnswerOrganizerQuestionPage;
    teamKey: string;


    constructor(oppKey: string, fullyLoaded: any, answerToOrganizerQuestion: string,
        projectKey: string, teamKey: string) {
        this.reviewApplicationDetailsPage = new ReviewApplicationDetailsPage();
        this.reviewApplicationDetailsEditAnswerPage = new ReviewApplicationDetailsEditAnswerPage();
        this.reviewApplicationDetailsEditProfilePage = new ReviewApplicationDetailsEditProfilePage();
        this.pickTeamPage = new PickTeamPage();
        this.answerOrganizerQuestionPage = new AnswerOrganizerQuestionPage();
        this.answerTeamQuestionPage = new AnswerTeamQuestionPage();
        this.oppKey = oppKey;
        this.fullyLoaded = fullyLoaded;
        this.answerToOrganizerQuestion = answerToOrganizerQuestion;
        this.projectKey = projectKey;
        this.teamKey = teamKey;


    }
}