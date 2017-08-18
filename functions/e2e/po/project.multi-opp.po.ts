import { browser, by, element } from 'protractor';

export class ProjectMultiOppPage {

  navigateTo() {
    return browser.get('/project/LC');
  }

  getProjectTitleElement() {
    return element(by.css('h1.event-title'));
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

  getDescriptionElement() {
    return element(by.className('event-description segment')).$('p');
  }

  getLocationLink() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-location')).$$('a').first();
  }

  getLocationElement() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-location')).$$('a').first().$('div.text');
  }
  getLocationName() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-location')).$$('a').first().$('div.text').getText();
  }

  getDate() {
    return element(by.className('event-date-location segment'))
      .element(by.css('project-project-date')).$$('a').first().$('div.text').getText();
  }

  getMaximumKarmaPointsElement() {
    return element(by.css('div.event-karma > div.event-karma-count'));
  }

  getMaximumKarmaPoints() {
    return element(by.css('div.event-karma > div.event-karma-count')).getText();
  }

  getShareKarmaPointsElement() {
    return element(by.id('share-for-karma')).element(by.css('span'));
  }

  getShareKarmaPoints() {
    return element(by.id('share-for-karma')).element(by.css('span')).getText();
  }

  getLinkToEventPage() {
    return element(by.css('div.page-social.row')).$$('a').first();
  }

  getOrganizerDetailsElement() {
    return element(by.className('event-organizer segment'))
      .$('div.row').$('div.col-xs-9');
  }

  getOrganizerDetails() {
    return element(by.className('event-organizer segment'))
      .$('div.row').$('div.col-xs-9').getText();
  }

  getOrganizerImage() {
    return element(by.className('event-organizer segment'))
      .$('div.row').$('div.col-xs-3').$('img.img-circle');
  }

}
