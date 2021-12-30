const fs = require('fs');
const path = require('path');

const { urls } = require('./utils')

const NUM_TEST_FILES = 200;

const urlsPerTestFile = Math.floor(urls.length / NUM_TEST_FILES);

const createTestFile = (i) => `
import { constructFile, urls } from '../../utils';

urls.slice(${i * urlsPerTestFile}, ${(i+1) * urlsPerTestFile}).forEach(url => {
  it(url, () => {
    cy.task('log', \`running test for \${url}\`)
    // Fetch static HTML
    cy.request(\`https://www.\${url}\`)
      .then((response) => {
        cy.task('log', 'network request')
        if (response.status !== 200) throw Error(\`Expected 200 status code, received \${response.status}\`)
        cy.task('log', 'network request success')
        cy.writeFile(\`cypress/fixtures/\${url}.html\`, response.body)
      })

    cy.task('log', 'visit static site')
    // Visit static website
    cy.visit(\`cypress/fixtures/\${url}.html\`)

    cy.task('log', 'baseline')
    // Create baseline
    cy.viewport(1000, 1000)
    cy.reload(true)
    cy.task('log', 'baseline-1')
    cy.waitForStableDOM()
    // cy.waitForNetworkIdle(\`**\${url}**\`, 1000)
    cy.task('log', 'baseline-2')
    cy.screenshot(constructFile({ url, type: 'baseline' }), { capture: 'viewport' })

    cy.task('log', 'artifact')
    // Create artifact
    cy.viewport(1000, 1000)
    cy.reload(true)
    cy.task('log', 'artifact-1')
    cy.waitForStableDOM()
    // cy.waitForNetworkIdle(\`**\${url}**\`, 1000)
    cy.task('log', 'artifact-2')
    cy.screenshot(constructFile({ url, type: 'artifact' }), { capture: 'viewport' })

    // cy.task('log', 'regression')
    // // Create regression
    // cy.viewport(1000, 1000)
    // cy.reload(true)
    // cy.task('log', 'regression-1')
    // cy.waitForStableDOM()
    // // cy.waitForNetworkIdle(\`**\${url}**\`, 1000)
    // cy.task('log', 'regression-2')
    // cy.createRegression()
    // cy.task('log', 'regression-3')
    // cy.screenshot(constructFile({ url, type: 'regression' }), { capture: 'viewport' })
    // cy.task('log', 'regression-4')
  })
})
`;

for (let i = 0; i < NUM_TEST_FILES; i++) {
  const file = path.resolve(__dirname, `cypress/integration/generate-data-${i}.spec.js`)
  fs.writeFileSync(file, createTestFile(i));
}