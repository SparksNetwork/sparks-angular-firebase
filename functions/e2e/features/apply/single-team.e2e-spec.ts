import 'jasmine'
import { ProjectSingleOppPage } from '../../po/project.single-opp.po';
import { browser, ExpectedConditions } from 'protractor/built';
import { setUsers, setData, signIn, signOut } from '../../firebase';
import { USER_VERIFIED_PROFILE } from '../../fixtures/users';
import { AnswerQuestionPage } from '../../po/apply.answer-question.po';
import { PickTeamPage } from '../../po/apply.single.team.po';
import { AnswerTeamQuestion } from '../../po/apply.answer-team-question.po';

const waitTimeout = 7000

describe('Apply-Single-Team: verified user with complete profile information', () => {
    let KPCprojectPage: ProjectSingleOppPage
    let answerQuestionPage: AnswerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestion: AnswerTeamQuestion

    const fullyLoaded = require('../../fixtures/fully-loaded.json')

    beforeAll(done => {
        KPCprojectPage = new ProjectSingleOppPage();
        answerQuestionPage = new AnswerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestion = new AnswerTeamQuestion()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(done)
    });

    describe('Checking Previous and Next functionality', () => {
        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('Previous button should take user back to Organizer Question', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let previousButton = pickTeamPage.getPreviousButton()
                    browser.wait(ExpectedConditions.presenceOf(previousButton),
                        waitTimeout, 'Previous button was not present').then(function () {
                            previousButton.click().then(function () {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                    ExpectedConditions.urlContains('/answer-question')),
                                    waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {
                                        let question = answerQuestionPage.getQuestion()
                                        browser.wait(ExpectedConditions.presenceOf(question),
                                            waitTimeout, 'The text of the question was not present').then(function () {
                                                question.getText().then((str) => {
                                                    browser.getCurrentUrl().then((url) => {
                                                        let oppKey: string = GetOppKey(url)
                                                        expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
                                                            'The text of the question was not correct')
                                                        let nextButton = answerQuestionPage.getNextButton().click().then(function () {
                                                            browser.wait(ExpectedConditions.and(
                                                                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                ExpectedConditions.urlContains('/teams')),
                                                                waitTimeout, 'User was not taken back to Pick-a-team Page')
                                                        })

                                                    })
                                                })

                                            })

                                    })


                            })

                        })
                })


        })

        it('Previous button should allow user to edit his answer ' +
            'to Organizer Question', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                        //press previous from Pick-a-team-page
                        let previousButton = pickTeamPage.getPreviousButton()
                        browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                            waitTimeout, 'Previous button was not present').then(function () {
                                previousButton.click().then(function () {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                        ExpectedConditions.urlContains('/answer-question')),
                                        waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {

                                            //edit the answer
                                            let answer = answerQuestionPage.getAnswer()
                                            browser.wait(ExpectedConditions.presenceOf(answer),
                                                waitTimeout, 'The input for answer was not present').then(function () {
                                                    let newAnswer: string = 'Answer must 42'
                                                    answerQuestionPage.getAnswer().sendKeys(newAnswer)

                                                    //press next
                                                    let nextButton = answerQuestionPage.getNextButton()
                                                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton), waitTimeout,
                                                        'Next button from Answer-organizer-question was not clickable').then(function () {
                                                            nextButton.click().then(function () {
                                                                browser.wait(ExpectedConditions.and(
                                                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                    ExpectedConditions.urlContains('/teams')),
                                                                    waitTimeout, 'User was not taken back to Pick-a-team Page ' +
                                                                    'after editing his answer').then(function () {

                                                                        //pres previous again
                                                                        previousButton = pickTeamPage.getPreviousButton()
                                                                        browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
                                                                            waitTimeout, 'Previous button was not clickable when returning ' +
                                                                            'to Pick-a-team page').then(function () {
                                                                                previousButton.click().then(function () {
                                                                                    //check to see if the answer is the one that was edited
                                                                                    let answer = answerQuestionPage.getAnswer()
                                                                                    browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
                                                                                        'The new answer to the organizer question was not present').then(function () {
                                                                                            answer.getAttribute('value').then((answer) => {
                                                                                                expect(answer).toMatch(newAnswer,
                                                                                                    'The new answer was not save correctly')
                                                                                                answerQuestionPage.getNextButton().click().then(function () {
                                                                                                    browser.wait(ExpectedConditions.and(
                                                                                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                                                                        ExpectedConditions.urlContains('/teams')),
                                                                                                        waitTimeout, 'User was not taken back to Pick-a-team Page')
                                                                                                })
                                                                                            })
                                                                                        })

                                                                                })
                                                                            })
                                                                    })
                                                            })
                                                        })
                                                })
                                        })
                                })
                            })
                    })
            })

        it('Next button is clickable only if the available team is selected ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let nextButton = pickTeamPage.getNextButton()
                    browser.wait(ExpectedConditions.presenceOf(nextButton),
                        waitTimeout, 'Next button was not present')
                    browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeClickable(nextButton)),
                        waitTimeout, 'Next button was clickable when no team was selected')

                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present')

                    //user clicks on the team
                    pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                        browser.wait(ExpectedConditions.and(
                            ExpectedConditions.urlContains('/apply/KPC1/application/'),
                            ExpectedConditions.urlContains('/teams/KPC1')),
                            waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {

                                //answer Team-question 
                                let answer = answerTeamQuestion.getAnswer()
                                browser.wait(ExpectedConditions.presenceOf(answer),
                                    waitTimeout, 'The input for answer was not present')
                                answerQuestionPage.getAnswer().sendKeys('Answer is always 42')

                                //press join
                                let joinButton = answerTeamQuestion.getJoinTeamButton()
                                browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                                    'Join button was not clickable').then(function () {
                                        joinButton.click().then(function () {
                                            browser.wait(ExpectedConditions.and(
                                                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                ExpectedConditions.urlContains('/teams')),
                                                waitTimeout, 'User was not taken back to Pick-a-team Page ' +
                                                'after answering the team question').then(function () {
                                                    //team should appear as selected
                                                    let selectedTeam = pickTeamPage.getSelectedTeam(0)
                                                    browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                                                        waitTimeout, 'The selected team was not present')
                                                    nextButton = pickTeamPage.getNextButton()
                                                    browser.wait(ExpectedConditions.elementToBeClickable(nextButton),
                                                        waitTimeout, 'Next button was not clickable when the team was clicked')
                                                    expect(true).toBeTruthy()
                                                })
                                        })
                                    })
                            })
                    })

                })

        });

    })

    describe('Showing the team', () => {
        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('it should display only the available team ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present').then(function () {
                            pickTeamPage.getAvailableTeams().count().then((nrteams) => {
                                expect(nrteams).toBe(1, 'There was not only one team displayed')
                            })
                        })
                })
        })

        it('it should display the title and the icon of the team ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present').then(function () {

                            let kpc1_1 = fullyLoaded['oppAllowedTeam']['KPC1-1']['team']
                            pickTeamPage.getAvailableTeamTitle(team).getText().then((title) => {
                                expect(title).toMatch(kpc1_1['title'], 'Team title was not correct')
                            })

                            pickTeamPage.getAvailableTeamIcon(team).getAttribute('class').then((className) => {
                                expect(className).toContain(kpc1_1['icon'], 'Team icon was not correct')
                            })

                        })
                })
        })

    })

    describe('Choosing the team ', () => {

        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('user can click on the single team, on the next page he can press Previous to return' +
            ' if he do not want to join ', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {

                        //the available team is displayed
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The available team was not present').then(function () {
                                //user clicks on the team
                                pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                                    browser.wait(ExpectedConditions.and(
                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                        ExpectedConditions.urlContains('/teams/KPC1')),
                                        waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {

                                            //on the Answer-team-question page user clicks Previuous 
                                            let previous = answerTeamQuestion.getPreviousButton()
                                            browser.wait(ExpectedConditions.elementToBeClickable(previous), waitTimeout,
                                                'Previous button from Answer-team-question was not clickable').then(function () {
                                                    previous.click().then(function () {
                                                        //user is taken back to Apply-team page
                                                        browser.wait(ExpectedConditions.and(
                                                            ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                            ExpectedConditions.urlContains('/teams')),
                                                            waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {

                                                                //the link to join the available team should be present again
                                                                team = pickTeamPage.getAvailableTeamLink(0)
                                                                browser.wait(ExpectedConditions.presenceOf(team),
                                                                    waitTimeout, 'The available team was not present ' +
                                                                    'when returning from Answer-team-question page')
                                                                expect(true).toBeTruthy()
                                                            })
                                                    })
                                                })
                                        })
                                })
                            })
                    })
            })

        it('user can join the team only if answers the team-question', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    //the available team is displayed
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The available team was not present').then(function () {

                            //user clicks on the team
                            pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                                browser.wait(ExpectedConditions.and(
                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                    ExpectedConditions.urlContains('/teams/KPC1')),
                                    waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {
                                        //answer Team-question 
                                        let answer = answerTeamQuestion.getAnswer()
                                        browser.wait(ExpectedConditions.presenceOf(answer),
                                            waitTimeout, 'The input for answer team question was not present')
                                        answerQuestionPage.getAnswer().sendKeys('Answer is always 42')
                                        //press join
                                        let joinButton = answerTeamQuestion.getJoinTeamButton()
                                        browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                                            'Join button was not clickable').then(function () {

                                                joinButton.click().then(function () {
                                                    browser.wait(ExpectedConditions.and(
                                                        ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                        ExpectedConditions.urlContains('/teams')),
                                                        waitTimeout, 'User was not taken back to Pick-a-team Page ' +
                                                        'after answering the team question').then(function () {
                                                            //team should appear as selected
                                                            let selectedTeam = pickTeamPage.getSelectedTeam(0)
                                                            browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                                                                waitTimeout, 'The selected team was not present').then(function () {

                                                                    pickTeamPage.getSelectedTeamTitle(selectedTeam).getText().then((title) => {
                                                                        expect(title).toMatch(fullyLoaded['oppAllowedTeam']['KPC1-1']['team']['title'], 'Team title was not correct')
                                                                    })
                                                                    //only one team should be selected
                                                                    pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
                                                                        expect(teamsNo).toBe(1, 'The number of selected teams was not correct')
                                                                    })
                                                                })
                                                        })
                                                })
                                            })
                                    })
                            })
                        })
                })

        });

        it('it should not display any available team', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                    pickTeamPage.getAvailableTeams().count().then((teamsNo) => {
                        expect(teamsNo).toBe(0, 'The number of available teams was not correct')
                    })
                })

        });

        it('Delete button should make the team available again ' +
            'and remove it from selected teams', function () {
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                        let selectedTeam = pickTeamPage.getSelectedTeam(0)
                        pickTeamPage.getDeleteButtton(selectedTeam).click()
                            .then(function () {
                                CommonTestsForDeleteAndDeleteAll()
                            })

                    })

            });

        it('Delete all button should have the same behaviour ' +
            'as Delete button', function () {
                //join again a team
                browser.wait(ExpectedConditions.and(
                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                    ExpectedConditions.urlContains('/teams')),
                    waitTimeout, 'User was not taken to Pick-a-team Page').then(function () {
                        //the available team is displayed
                        let team = pickTeamPage.getAvailableTeamLink(0)
                        browser.wait(ExpectedConditions.presenceOf(team),
                            waitTimeout, 'The available team was not present')

                        //user clicks on the team
                        pickTeamPage.getAvailableTeamTitle(team).click().then(function () {
                            browser.wait(ExpectedConditions.and(
                                ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                ExpectedConditions.urlContains('/teams/KPC1')),
                                waitTimeout, 'User was not taken to Answer-team-question Page').then(function () {

                                    //answer Team-question 
                                    let answer = answerTeamQuestion.getAnswer()
                                    browser.wait(ExpectedConditions.presenceOf(answer),
                                        waitTimeout, 'The input for answer was not present')
                                    answerQuestionPage.getAnswer().sendKeys('Answer is always 42')

                                    //press join
                                    let joinButton = answerTeamQuestion.getJoinTeamButton()
                                    browser.wait(ExpectedConditions.elementToBeClickable(joinButton), waitTimeout,
                                        'Join button was not clickable').then(function () {
                                            joinButton.click().then(function () {
                                                browser.wait(ExpectedConditions.and(
                                                    ExpectedConditions.urlContains('/apply/KPC1/application/'),
                                                    ExpectedConditions.urlContains('/teams')),
                                                    waitTimeout, 'User was not taken back to Pick-a-team Page ' +
                                                    'after answering the team question').then(function () {
                                                        //team should appear as selected
                                                        let selectedTeam = pickTeamPage.getSelectedTeam(0)
                                                        browser.wait(ExpectedConditions.presenceOf(selectedTeam),
                                                            waitTimeout, 'The selected team was not present')

                                                        //click Delete all button
                                                        let deleteButton = pickTeamPage.getDeleteAllButton()
                                                        browser.wait(ExpectedConditions.elementToBeClickable(deleteButton),
                                                            waitTimeout, 'Delete all was not clickable').then(function () {
                                                                deleteButton.click().then(function () {
                                                                    CommonTestsForDeleteAndDeleteAll()
                                                                })
                                                            })
                                                    })
                                            })
                                        })
                                })
                        })
                    })
            })
    })

    //helper functions
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }

    function StepsToReachApplyChooseTeamsPage(done) {
        browser.get('/')
            .then(function () {
                setData('/', fullyLoaded)
                    .then(function () {
                        signOut()
                            .then(function () {
                                signIn(USER_VERIFIED_PROFILE.email, USER_VERIFIED_PROFILE.password)
                                    .then(function () {
                                        KPCprojectPage.navigateTo()
                                            .then(function () {
                                                browser.wait(ExpectedConditions.elementToBeClickable(KPCprojectPage.getJoinButton()),
                                                    waitTimeout, 'Join button was not present')
                                                KPCprojectPage.getJoinButton().click()
                                                    .then(function () {
                                                        browser.wait(ExpectedConditions.presenceOf(answerQuestionPage.getNextButton()),
                                                            waitTimeout, 'Next button was not present')
                                                        answerQuestionPage.getAnswer().sendKeys('42')
                                                        let next = answerQuestionPage.getNextButton()
                                                        browser.wait(ExpectedConditions.elementToBeClickable(next),
                                                            waitTimeout, 'Next button was not clickable')
                                                        next.click()
                                                            .then(done)
                                                    })
                                            })
                                    })
                            })
                    })
            })



    }

    function CommonTestsForDeleteAndDeleteAll() {
        let availableTeam = pickTeamPage.getAvailableTeamLink(0)
        browser.wait(ExpectedConditions.presenceOf(availableTeam),
            waitTimeout, 'The available team was not present')

        pickTeamPage.getSelectedTeams().count().then((teamsNo) => {
            expect(teamsNo).toBe(0, 'The number of selected teams was not correct')
        })

        pickTeamPage.getAvailableTeams().count().then((nrteams) => {
            expect(nrteams).toBe(1, 'There was not only one team displayed')
        })
    }

})