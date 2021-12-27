const domain = 'twitter';

import { constructFile } from '../../utils';

describe(domain, () => {
  it('baseline', () => {
    cy.viewport(1000, 4000)
    cy.visit(`https://${domain}.com/`)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(constructFile({ domain, type: 'baseline' }), { capture: 'viewport' })
  })

  it('artifact', () => {
    cy.viewport(1000, 4000)
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(constructFile({ domain, type: 'artifact' }), { capture: 'viewport' })
  })

  it('regression', () => {
    cy.viewport(1000, 4000)
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.createRegression()
    cy.screenshot(constructFile({ domain, type: 'regression' }), { capture: 'viewport' })
  })
})