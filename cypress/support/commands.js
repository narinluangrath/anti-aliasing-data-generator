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
  cy.document().then(document => {
    // Get a random element on the screen (that is visible)
    const randomElements = [];
    const elements = Array.from(document.body.getElementsByTagName("*"))
    const numElementsToChange = getRandomNumber(MAX_ELEMENTS_TO_CHANGE);
    while (randomElements.length < numElementsToChange) {
      const randomElement = getRandomElementOfArray(elements);
      if (Cypress.dom.isVisible(randomElement)) {
        randomElements.push(randomElement);
      }
    }

    randomElements.forEach(e => {
      cy.wrap(e).invoke('attr', 'style', getRandomCss());
    })
  })
})
