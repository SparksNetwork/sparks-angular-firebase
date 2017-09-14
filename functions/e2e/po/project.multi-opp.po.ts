import { browser, by, element, ElementFinder } from 'protractor';
import { ProjectPage } from "./project.po";

export class ProjectMultiOppPage extends ProjectPage {

  navigateTo() {
    return browser.get('/project/LC');
  }

  getNumberOfOportunityLinks() {
    return element.all(by.css('snui-card-item')).count();
  }

  getTitle(link: ElementFinder) {
    return link.element(by.css('snui-card-item')).$$('div.text').first().$('h4');
  }

  getBenefitValue(link: ElementFinder) {
    return link.element(by.css('snui-card-item')).$$('div.text').first().all(by.css('p')).first();
  }

  getDiscount(link: ElementFinder) {
    return link.element(by.css('snui-card-item')).$$('div.text').first().all(by.css('p')).get(1);
  }

  getLinks() {
    return element.all(by.css('div.opp-item a'))
  }

  getFirstOportunitySpan() {
    return element.all(by.css('snui-card-item')).first()
      .$$('div.icon').first().$('span');
  }
  getSecondOportunitySpan() {
    return element.all(by.css('snui-card-item')).get(1)
      .$$('div.icon').first().$('span');
  }
  getThirdOportunitySpan() {
    return element.all(by.css('snui-card-item')).get(2)
      .$$('div.icon').first().$('span');
  }
  getFourthOportunitySpan() {
    return element.all(by.css('snui-card-item')).get(3)
      .$$('div.icon').first().$('span');
  }
  getFifthOportunitySpan() {
    return element.all(by.css('snui-card-item')).get(4)
      .$$('div.icon').first().$('span');
  }

  getFirstOportunityTitle() {
    return element.all(by.css('snui-card-item')).first()
      .$$('div.text').first().$('h4').getText();
  }

  getFirstOportunityTitleElement() {
    return element.all(by.css('snui-card-item')).first()
      .$$('div.text').first().$('h4');
  }

  getFirstOportunityContribValue() {
    return element.all(by.css('snui-card-item')).first()
      .$$('div.text').first().all(by.css('p')).first().getText();
  }

  getFirstOportunityDiscount() {
    return element.all(by.css('snui-card-item')).first()
      .$$('div.text').first().all(by.css('p')).last().getText();
  }

  getThirdOportunityTitle() {
    return element.all(by.css('snui-card-item')).get(2)
      .$$('div.text').first().$('h4').getText();
  }

  getThirdOportunityContribValue() {
    return element.all(by.css('snui-card-item')).get(2)
      .$$('div.text').first().all(by.css('p')).first().getText();
  }

}
