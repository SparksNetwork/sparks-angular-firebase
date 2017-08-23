import { browser, by, element } from 'protractor';

export class GuestHomePage {

  navigateTo() {
    return browser.get('/');
  }

  getListOfProjectLinks() {
    return element.all(by.css('home-all-projects a'));
  }

  getAllProjectTitles() {
    return element.all(by.css('home-all-projects a h3'));
  }

  getAllProjectMaxKarmaPoints() {
    return element.all(by.css('home-all-projects a div.event-karma div.event-karma-count'));
  }

}