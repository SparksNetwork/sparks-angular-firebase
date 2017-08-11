import { browser, by, element } from 'protractor';

export class ProjectPage {

  navigateTo() {
    return browser.get('/project/LCTest');
  }

  getProjectTitle() {
    return element(by.css('h1.event-title')).getText();
  }

  getNavbarBrandLink() {
    return element(by.css('a.navbar-brand')).getText();
  }

  getLastCarouselIndicator() {
    return element.all(by.css('ol.carousel-indicators li')).last();
  }

  getCarouselActiveImageDiv() {
    return element(by.className('item carousel-item active'))
      .element(by.css('div.item.active'))
      .element(by.css('div.item'));
  }

  getNumberOfOportunityLinks() {
    return element.all(by.css('snui-card-item')).count();
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

  getDescriptionText() {
    return element(by.className('event-description segment')).$('p').getText();
  }

  getLocationLink() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-location')).$$('a').first();
  }

  getLocationName() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-location')).$$('a').first().$('div.text').getText();
  }

  getDate() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-date')).$$('a').first().$('div.text').getText();
  }

  getLinkToAddToCalendar() {
    return element(by.css('project-project-date a'));
  }

  getMaximumKarmaPoints() {
    return element(by.css('div.event-karma > div.event-karma-count')).getText();
  }

  getShareKarmaPoints() {
    return element(by.id('share-for-karma')).element(by.css('span')).getText();
  }

  getLinkToEventPage(){
    return element(by.css('div.page-social.row')).$$('a').first();
  }

  getAskOrganizerLinkText(){
     return element(by.id('event-contact')).element(by.css('a')).element(by.css('div.text')).getText();
  }

  getOrganizerDetails(){
    return element(by.className("event-organizer segment"))
    .$('div.row').$('div.col-xs-9').getText();
  }

  getOrganizerImage(){
    return element(by.className("event-organizer segment"))
     .$('div.row').$('div.col-xs-3').$('img.img-circle');
  }

}
