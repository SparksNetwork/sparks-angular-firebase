import 'jasmine'
import { ProjectMultiOppPage } from '../../po/project.multi-opp.po';
import { OpportunityPartialDiscountPage } from "../../po/opp.partial-discount.po";
import { AnswerQuestionPage } from "../../po/apply.answer-question.po";
import { PickTeamPage } from "../../po/apply.single.team.po";
import { AnswerTeamQuestion } from "../../po/apply.answer-team-question.po";
import { browser, ExpectedConditions } from "protractor/built";
import { setUsers, setData, signOut, signIn } from "../../firebase";
import { USER_VERIFIED_PROFILE } from "../../fixtures/users";


const waitTimeout = 7000
describe('Apply-Choosing-Teams: verified user with complete profile information', () => {
    let LCprojectPage: ProjectMultiOppPage
    let oppLCPage: OpportunityPartialDiscountPage
    let answerQuestionPage: AnswerQuestionPage
    let pickTeamPage: PickTeamPage
    let answerTeamQuestion: AnswerTeamQuestion

    const fullyLoaded = require('../../fixtures/fully-loaded.json')
    const oppAllowedTeams = fullyLoaded['oppAllowedTeam']

    beforeAll(done => {
        LCprojectPage = new ProjectMultiOppPage()
        oppLCPage = new OpportunityPartialDiscountPage()
        answerQuestionPage = new AnswerQuestionPage();
        pickTeamPage = new PickTeamPage()
        answerTeamQuestion = new AnswerTeamQuestion()
        browser.waitForAngularEnabled(false)
        setUsers()
            .then(done)
    })

    // describe('Checking Previous button functionality', () => {
    //     beforeAll(done => {
    //         StepsToReachApplyChooseTeamsPage(done)
    //     })

    //     it('Previous button should take user back to Organizer Question', function () {
    //         browser.wait(ExpectedConditions.and(
    //             ExpectedConditions.urlContains('/apply/LC1/application/'),
    //             ExpectedConditions.urlContains('/teams')),
    //             waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
    //                 let previousButton = pickTeamPage.getPreviousButton()
    //                 browser.wait(ExpectedConditions.presenceOf(previousButton),
    //                     waitTimeout, 'Previous button was not present').then(function () {
    //                         previousButton.click().then(function () {
    //                             browser.wait(ExpectedConditions.and(
    //                                 ExpectedConditions.urlContains('/apply/LC1/application/'),
    //                                 ExpectedConditions.urlContains('/answer-question')),
    //                                 waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {
    //                                     let question = answerQuestionPage.getQuestion()
    //                                     browser.wait(ExpectedConditions.presenceOf(question),
    //                                         waitTimeout, 'The text of the question was not present').then(function () {
    //                                             question.getText().then((str) => {
    //                                                 browser.getCurrentUrl().then((url) => {
    //                                                     let oppKey: string = GetOppKey(url)
    //                                                     expect(str).toMatch(fullyLoaded['opp'][oppKey]['question'],
    //                                                         'The text of the question was not correct')
    //                                                     let nextButton = answerQuestionPage.getNextButton().click().then(function () {
    //                                                         browser.wait(ExpectedConditions.and(
    //                                                             ExpectedConditions.urlContains('/apply/LC1/application/'),
    //                                                             ExpectedConditions.urlContains('/teams')),
    //                                                             waitTimeout, 'User was not taken back to Pick-teams Page')
    //                                                     })

    //                                                 })
    //                                             })

    //                                         })

    //                                 })


    //                         })

    //                     })
    //             })


    //     })

    //     it('Previous button should allow user to edit his answer ' +
    //         'to Organizer Question', function () {
    //             browser.wait(ExpectedConditions.and(
    //                 ExpectedConditions.urlContains('/apply/LC1/application/'),
    //                 ExpectedConditions.urlContains('/teams')),
    //                 waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
    //                     //press previous from Pick-a-team-page
    //                     let previousButton = pickTeamPage.getPreviousButton()
    //                     browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
    //                         waitTimeout, 'Previous button was not present').then(function () {
    //                             previousButton.click().then(function () {
    //                                 browser.wait(ExpectedConditions.and(
    //                                     ExpectedConditions.urlContains('/apply/LC1/application/'),
    //                                     ExpectedConditions.urlContains('/answer-question')),
    //                                     waitTimeout, 'User was not taken to Answer-organizer-question page').then(function () {

    //                                         //edit the answer
    //                                         let answer = answerQuestionPage.getAnswer()
    //                                         browser.wait(ExpectedConditions.presenceOf(answer),
    //                                             waitTimeout, 'The input for answer was not present').then(function () {
    //                                                 let newAnswer: string = 'Answer must 42'
    //                                                 answerQuestionPage.getAnswer().sendKeys(newAnswer)

    //                                                 //press next
    //                                                 let nextButton = answerQuestionPage.getNextButton()
    //                                                 browser.wait(ExpectedConditions.elementToBeClickable(nextButton), waitTimeout,
    //                                                     'Next button from Answer-organizer-question was not clickable').then(function () {
    //                                                         nextButton.click().then(function () {
    //                                                             browser.wait(ExpectedConditions.and(
    //                                                                 ExpectedConditions.urlContains('/apply/LC1/application/'),
    //                                                                 ExpectedConditions.urlContains('/teams')),
    //                                                                 waitTimeout, 'User was not taken back to Pick-teams Page ' +
    //                                                                 'after editing his answer').then(function () {

    //                                                                     //pres previous again
    //                                                                     previousButton = pickTeamPage.getPreviousButton()
    //                                                                     browser.wait(ExpectedConditions.elementToBeClickable(previousButton),
    //                                                                         waitTimeout, 'Previous button was not clickable when returning ' +
    //                                                                         'to Pick-a-team page').then(function () {
    //                                                                             previousButton.click().then(function () {
    //                                                                                 //check to see if the answer is the one that was edited
    //                                                                                 let answer = answerQuestionPage.getAnswer()
    //                                                                                 browser.wait(ExpectedConditions.presenceOf(answer), waitTimeout,
    //                                                                                     'The new answer to the organizer question was not present').then(function () {
    //                                                                                         answer.getAttribute('value').then((answer) => {
    //                                                                                             expect(answer).toMatch(newAnswer,
    //                                                                                                 'The new answer was not save correctly')
    //                                                                                             answerQuestionPage.getNextButton().click()
    //                                                                                         })
    //                                                                                     })

    //                                                                             })
    //                                                                         })
    //                                                                 })
    //                                                         })
    //                                                     })
    //                                             })
    //                                     })
    //                             })
    //                         })
    //                 })
    //         })

    // })

    describe('Showing the teams', () => {
        beforeAll(done => {
            StepsToReachApplyChooseTeamsPage(done)
        })

        it('all teams from test data file should be present', () => {
            let teamLinks = pickTeamPage.getTeamLinks()
            browser.wait(ExpectedConditions.presenceOf(teamLinks.first()),
                waitTimeout, 'First link was not present')

            //looping through all the keys and see if all projects are displayed 
            let isPresent: boolean = false;
            for (let key in oppAllowedTeams) {
                if (key.toString().includes('LC1-')) {
                    isPresent = false;
                    teamLinks.each(function (item) {
                        item.getAttribute('href').then(function (url) {
                            if (key.toString().endsWith(GetTeamKey(url))) {
                                isPresent = true;
                            }
                        })

                    }).then(function () {
                        expect(isPresent).toBe(true, 'Team with key ' + key.toString() + ' was not present');
                    })
                }
            }
        })

        it('it should display all the available teams ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                    let team = pickTeamPage.getAvailableTeamLink(0)
                    browser.wait(ExpectedConditions.presenceOf(team),
                        waitTimeout, 'The first available team was not present').then(function () {
                            pickTeamPage.getAvailableTeams().count().then((noteams) => {
                                expect(noteams).toBe(GetNoAvailableTeamsFromTestData(), 'The number of available teams is not correct')
                            })
                        })
                })
        })

        it('it should display the title and the icon of the teams ', function () {
            browser.wait(ExpectedConditions.and(
                ExpectedConditions.urlContains('/apply/LC1/application/'),
                ExpectedConditions.urlContains('/teams')),
                waitTimeout, 'User was not taken to Pick-teams Page').then(function () {
                    let teamsLinks = pickTeamPage.getTeamLinks()
                    browser.wait(ExpectedConditions.presenceOf(teamsLinks.first()),
                        waitTimeout, 'The first available team was not present').then(function () {

                            teamsLinks.each(function (item) {
                                item.getAttribute('href').then(function (url) {
                                    pickTeamPage.getAvailableTeamTitle(item).getText().then((title) => {
                                        expect(title).toMatch(oppAllowedTeams[GetOppKeyFromAnswerTeamQuestionPage(url) + '-' + GetTeamKey(url)]['team']['title'], 'Team title was not correct')
                                    })

                                    pickTeamPage.getAvailableTeamIcon(item).getAttribute('class').then((className) => {
                                        expect(className).toContain(oppAllowedTeams[GetOppKeyFromAnswerTeamQuestionPage(url) + '-' + GetTeamKey(url)]['team']['icon'], 'Team icon was not correct')
                                    })
                                })
                            })

                        })
                })
        })

    })

    //helper functions
    function GetTeamKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 1];
    }
    function GetOppKey(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 4];
    }
    function GetOppKeyFromAnswerTeamQuestionPage(url: string) {
        let splittedUrl = url.split('/');
        return splittedUrl[splittedUrl.length - 5];
    }

    function GetNoAvailableTeamsFromTestData() {
        let noTeams: number = 0
        for (let key in oppAllowedTeams) {
            if (key.toString().includes('LC1-')) {
                noTeams++
            }
        }
        return noTeams
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
                                        LCprojectPage.navigateTo()
                                            .then(function () {
                                                browser.wait(ExpectedConditions.presenceOf(LCprojectPage.getFirstOportunityTitleElement()),
                                                    waitTimeout, 'Link to the first opportunity of LC was not present')
                                                LCprojectPage.getFirstOportunityTitleElement().click()
                                                    .then(function () {
                                                        browser.wait(ExpectedConditions.presenceOf(oppLCPage.getJoinButton()),
                                                            waitTimeout, 'Join opportunity button was not present')
                                                        oppLCPage.getJoinButton().click().then(function () {
                                                            browser.wait(ExpectedConditions.presenceOf(answerQuestionPage.getAnswer()), waitTimeout,
                                                                'Answer to organizer question was not present')
                                                            answerQuestionPage.getAnswer().sendKeys('42')
                                                            let next = answerQuestionPage.getNextButton()
                                                            browser.wait(ExpectedConditions.elementToBeClickable(next),
                                                                waitTimeout, 'Next button was not clickable').then(function () {
                                                                    next.click().then(done)
                                                                })

                                                        })

                                                    })
                                            })
                                    })
                            })
                    })
            })


    }

})