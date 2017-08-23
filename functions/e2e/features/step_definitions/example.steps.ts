import { browser, element, by, ExpectedConditions } from "protractor/built";
import cucumber = require('cucumber')

import { binding, given, when, then, after } from 'cucumber-tsflow';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


@binding()
class ExampleSteps {

  @given(/^I go to "(.+)"$/, )
  public givenAnUrl(url: string): void {
    browser.get(url);
  };

  @then(/^it should display a welcome message$/)
  private thenAssertWelcomeMessage(callback: cucumber.CallbackStepDefinition): void {
    let title = element(by.css('div.profile-hero-content h2'));

    expect(element(by.css('div.profile-hero-content h2')).getText()).to.eventually
      .equal('Hello Guest,');
      callback();
 

  }

}

export =  ExampleSteps;