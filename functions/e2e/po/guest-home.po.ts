import { browser, by, element } from 'protractor';

export class GuestHomePage {

  navigateTo() {
    return browser.get('/');
  }

  getListOfProjectLinks(){
      return element.all(by.css('home-all-projects a'));
  }

}