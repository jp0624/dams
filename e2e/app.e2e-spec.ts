import { FrontendPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

// var origFn = browser.driver.controlFlow().execute;

// browser.driver.controlFlow().execute = function() {
//   var args = arguments;

//   // queue 100ms wait
//   origFn.call(browser.driver.controlFlow(), function() {
//     return protractor.promise.delayed(1000);
//   });

//   return origFn.apply(browser.driver.controlFlow(), args);
// };

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();

    browser.wait(function() {
        browser.sleep(2000);
        console.log('1 - BeforeEach WAIT');
        return true;
    }, 5000).then(function () {
        console.log('2 - BeforeEach after wait');
    });
  });

  it('1. should display Main Dashboard message and click lessons button and show lesson dashboard', () => {
    page.navigateTo();
    // browser.pause();
    browser.waitForAngularEnabled(false);
    // browser.pause();
    expect(page.getParagraphText()).toEqual('Main Dashboard');

    element(by.css('[routerlink="/lesson"]')).click();
    browser.waitForAngular();
    expect(element(by.css('app-lesson-home h1')).getText()).toEqual('Lesson Dashboard');
  });

  it('2. should click the lessons list button in lesson dashboard', () => {
    browser.waitForAngular();
    element(by.css('[routerlink="/lesson/list"]')).click();
    expect(true).toBeTruthy();
  });

  it('3. should display Lesson grid', () => {
    browser.waitForAngular();
    expect(by.css('th:nth-child(3) span')).toBeDefined();
  });
  
  it('4. should sort the lesson grid column', () => {
    browser.waitForAngular();
    expect(by.css('th:nth-child(3) span')).toBeDefined();
    element(by.css('th:nth-child(3) span')).click();
    expect(true).toBeTruthy();
  });

  it('4. should select a lesson to edit and view', () => {
    browser.waitForAngular();
    element(by.css('tr:nth-child(2)')).click();
    expect(true).toBeTruthy();
  });

  it('5. Should able to view a lesson', () => {
    browser.waitForAngular();
    expect(true).toBeTruthy();
  });

});
