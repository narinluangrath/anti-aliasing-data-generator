import { recurse } from 'cypress-recurse'

import css from '../../css.json';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const MAX_ELEMENTS_TO_CHANGE = 20;

// Get random positive integer smaller than limit
const getRandomNumber = (limit) => {
  const random = Math.random() // [0, 1]
  const decimal = limit * random // [0, limit]
  return Math.floor(decimal);
}

const getRandomElementOfArray = (arr) => {
  if (!arr?.length) {
    throw Error('Empty array passed');
  }
  
  const randomIndex = getRandomNumber(arr.length);
  return arr[randomIndex];
}

const getRandomValueOfObject = (obj) => {
  const keys = Object.keys(obj);
  const key = getRandomElementOfArray(keys);
  return obj[key];
}

const getRandomCss = () => getRandomElementOfArray(getRandomValueOfObject(css));

Cypress.Commands.add('createRegression', () => {
  cy.task('log', 'createRegression')
  cy.document().then(document => {
    cy.task('log', 'createRegression-1')
    // Get a random element on the screen (that is visible)
    const randomElements = [];
    const elements = Array.from(document.body.getElementsByTagName("*"))
    cy.task('log', 'createRegression-2')
    const numElementsToChange = getRandomNumber(MAX_ELEMENTS_TO_CHANGE);
    cy.task('log', 'createRegression-3')
    while (randomElements.length < numElementsToChange) {
      cy.task('log', 'createRegression-loop')
      const randomElement = getRandomElementOfArray(elements);
      if (Cypress.dom.isVisible(randomElement)) {
        randomElements.push(randomElement);
      }
    }
    cy.task('log', 'createRegression-end-while')

    randomElements.forEach(e => {
      cy.task('log', 'createRegression-forEach')
      cy.wrap(e).invoke('attr', 'style', getRandomCss());
    })
    cy.task('log', 'createRegression-end-then')
  })
  cy.task('log', 'createRegression-5')
})

Cypress.Commands.add('waitForStableDOM', (wait = 1000) => {
  let mutation;

  cy.document()
    .then(document => {
      // Options for the observer (which mutations to observe)
      const config = {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
      };
      
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver((m) => mutation = m);
      
      // Start observing the target node for configured mutations
      observer.observe(document, config);
    })
    .then(() => {
      cy.wait(wait)
      recurse(
        () => {
          const temp = mutation;
          mutation = null;
          return cy.wrap(temp);
        },
        b => !b,
        {
          log: true,
          limit: 10,
          delay: wait,
          timeout: 10 * wait,
        }
      );
    })
})