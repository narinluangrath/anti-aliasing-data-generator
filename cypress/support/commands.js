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

Cypress.Commands.add('createRegression', () => {
  cy.document().then(document => {
    // Get a random element on the screen (that is visible)
    const randomElements = [];
    const elements = document.body.getElementsByTagName("*")
    while (randomElements.length < 5) {
      const randomIndex = Math.floor(Math.random() * elements.length)
      const randomElement = elements[randomIndex];
      if (Cypress.dom.isVisible(randomElement)) {
        randomElements.push(randomElement);
      }
    }

    randomElements.forEach(e => {
      cy.wrap(e).invoke('attr', 'style', 'border: 5px dashed green !important');
    })
  })
})
