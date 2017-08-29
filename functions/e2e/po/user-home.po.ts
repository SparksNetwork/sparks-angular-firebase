import { browser, by, element, ElementFinder } from 'protractor';

export class UserHomePage {

  navigateTo() {
    return browser.get('/')
  }

  getCurrentElementFinder(oldProjectElementFinder: ElementFinder) {
    return element(oldProjectElementFinder);
  }

  getWelcomeMessage() {
    return element(by.css('snui-user-header div.profile-hero div.profile-hero-content h2'))
  }
  getListOfProjectLinks() {
    return element.all(by.css('home-all-projects a'));
  }

  getProjectLink(projectIndex: number) {
    return element.all(by.css('home-all-projects a')).get(projectIndex);
  }

  getAllProjectTitles() {
    return element.all(by.css('home-all-projects a h3'));
  }

  getProjectTitle(link: ElementFinder) {
    return link.element(by.css('h3'))
  }

  getProjectDateUsingLink(link: ElementFinder) {
    return link.element(by.css('div.event-date'));
  }

  getProjectLocationUsingLink(link: ElementFinder) {
    return link.element(by.css('div.event-location'));
  }

  getAllProjectMaxKarmaPoints() {
    return element.all(by.css('home-all-projects a div.project-karma div.project-karma-count'));
  }

}