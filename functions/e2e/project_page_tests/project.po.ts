import { browser, by, element } from 'protractor';

export class ProjectPage {

  navigateTo() {
    return browser.get('/project/LCTest');
  }

  getProjectTitle() {
    return element(by.css('h1.event-title')).getText();
  }

  getNavbarBrandLink(){
    return element(by.css('a.navbar-brand')).getText();
  }

  getLastCarouselIndicator(){
    return element.all(by.css('ol.carousel-indicators li')).last();
  } 

  getCarouselActiveImageDiv(){
    return element(by.className('item carousel-item active'))
    .element(by.css('div.item.active'))
    .element(by.css('div.item'));
  }
}
