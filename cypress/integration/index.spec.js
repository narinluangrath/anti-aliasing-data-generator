const domain = 'google';

describe('domain', () => {
  it('initial', () => {
    cy.viewport(1000, 4000)
    cy.visit(`https://${domain}.com/`)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(`${domain}-baseline`, { capture: 'viewport' })
  })

  it('retake', () => {
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(`${domain}-comparison`, { capture: 'viewport' })
  })

  it('regression', () => {
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.createRegression()
    cy.screenshot(`${domain}-regression`, { capture: 'viewport' })
  })
})