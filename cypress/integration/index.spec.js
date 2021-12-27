describe('lululemon', () => {
  it('initial', () => {
    cy.viewport(1000, 4000)
    cy.visit('https://www.lululemon.com')
    cy.waitForNetworkIdle('**.lululemon.com**', 1000)
    cy.screenshot('lululemon-initial', { capture: 'viewport' })
  })

  it('retake', () => {
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle('**.lululemon.com**', 1000)
    cy.screenshot('lululemon-retake', { capture: 'viewport' })
  })

  it('regression', () => {
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle('**.lululemon.com**', 1000)
    cy.createRegression()
    cy.screenshot('lululemon-regression', { capture: 'viewport' })
  })
})