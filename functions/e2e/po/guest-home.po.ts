import { browser, by, element, ElementFinder } from 'protractor';

export class GuestHomePage {

  navigateTo() {
    return browser.get('/');
  }

  getWelcomeMessage(){
    return element(by.css('user-header div.profile-hero div.profile-hero-content h2'))
  }
  getListOfProjectLinks() {
    return element.all(by.css('home-all-projects a'));
  }

  getProjectLink(projectIndex:number){
    return element.all(by.css('home-all-projects a')).get(projectIndex);
  }

  getAllProjectTitles() {
    return element.all(by.css('home-all-projects a h3'));
  }

  getProjectTitle(el:ElementFinder) {
    return el.element(by.css('h3'))
  }

  getAllProjectMaxKarmaPoints() {
    return element.all(by.css('home-all-projects a div.event-karma div.event-karma-count'));
  }

  getProjectLocation(projectIndex: number) {
    return element.all(by.css('home-all-projects a ')).get(projectIndex).element(by.css('div.event-location'));
  }

  getProjectDate(projectIndex: number) {
    return element.all(by.css('home-all-projects a ')).get(projectIndex).element(by.css('div.event-date'));
  }
}