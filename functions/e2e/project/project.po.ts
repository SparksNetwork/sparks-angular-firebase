import { browser, by, element } from 'protractor';

export class ProjectPage {

  navigateTo() {
    return browser.get('/project/1');
  }

}
