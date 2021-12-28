import { constructFile } from '../../utils';

const domains = [
  'google',
  'facebook',
  'twitter',
  'instagram',
  'amazon',
  'netflix',
  'live',
  'tiktok',
  'discord',
  'twitch',
  'bing',
  'microsoft',
  'roblox'
]

domains.forEach(domain => {
  it(domain, () => {
    // Fetch static HTML
    cy.request(`https://www.${domain}.com`)
      .then((response) => {
        if (response.status !== 200) throw Error(`Expected 200 status code, received ${response.status}`)
        cy.writeFile(`cypress/fixtures/${domain}.html`, response.body)
      })

    // Create baseline
    cy.viewport(1000, 4000)
    cy.visit(`cypress/fixtures/${domain}.html`)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(constructFile({ domain, type: 'baseline' }), { capture: 'viewport' })

    // Create artifact
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.screenshot(constructFile({ domain, type: 'artifact' }), { capture: 'viewport' })

    // Create regression
    cy.viewport(1000, 4000)
    cy.reload(true)
    cy.waitForNetworkIdle(`**.${domain}.com**`, 1000)
    cy.createRegression()
    cy.screenshot(constructFile({ domain, type: 'regression' }), { capture: 'viewport' })
  })
})