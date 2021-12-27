/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser, launchOptions) => {
    const width = process.env.WIDTH || '3000'
    const height = process.env.HEIGHT || '6000'

    if (browser.name !== 'chrome') {
      throw Error('Just use chrome for now...')
    }

    launchOptions.args.push(`--window-size=${width},${height}`)
    launchOptions.args.push('--force-device-scale-factor=1')

    return launchOptions
  })

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
  })
}
