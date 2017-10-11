import { browser, element, by, ExpectedConditions as EC } from 'protractor'

export const chain = (promises: Array<any>) =>
  promises.reduce((prev, cur) => prev.then(() => cur), Promise.resolve())

export const navigateTo = url =>
  browser.get(url)

export const clickElement = locator =>
  browser
    .wait(EC.elementToBeClickable(element(by.css(locator))))
    .then(() => element(by.css(locator)).click())

export const clickNthElement = (locator, ordinal) => {
  const index = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    fifth: 4,
  }[ordinal]
  return browser
    .wait(EC.elementToBeClickable(element(by.css(locator))))
    .then(() => element.all(by.css(locator)).get(index).click())
}

export const clickElementContainingText = (locator, text) => {
  const finder = element(by.cssContainingText(locator, text))
  return browser
    .wait(EC.elementToBeClickable(finder))
    .then(() => finder.click())
}

export const populateFields = (inputObject: {[locator: string]: string}) => {
  const inputs = Object.keys(inputObject).map(key => ({locator: key, input: inputObject[key]}))
  return chain(
    inputs.map(({locator, input}) => browser.wait(EC.elementToBeClickable(element(by.css(locator)))))
  ).then(chain(
      inputs.map(({locator, input}) => element(by.css(locator)).sendKeys(input))
  ))
}
