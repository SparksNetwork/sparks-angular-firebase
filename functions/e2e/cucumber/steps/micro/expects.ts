import { browser, element, by, ExpectedConditions as EC } from 'protractor'

export const urlContains = url => browser.wait(EC.urlContains(url))

export const elementContainsText = (locator, text) =>
  browser.wait(EC.textToBePresentInElement(element(by.cssContainingText(locator, text)), text))

