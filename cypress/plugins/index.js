const fs = require('fs');
const path = require('path');
const { writeImageDiff, deconstructFile } = require('../../utils');

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
    const width = process.env.WIDTH || '2000'
    const height = process.env.HEIGHT || '2000'

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

    saveJson({ obj, fileName }) {
      console.log('saveJson')
      fs.writeFileSync(fileName, JSON.stringify(obj, null, 2));
      console.log('saveJson-1')
      return null;
    }
  })

  // https://docs.cypress.io/api/plugins/after-screenshot-api#Syntax
  on('after:screenshot', (details) => {
    console.log('after:screenshot')
    const basename = path.basename(details.path, '.png');
    const { type } = deconstructFile(basename);
    console.log('after:screenshot-1')
    if (type !== 'baseline' && !details.path.includes('failed')) {
      console.log('after:screenshot-2')
      writeImageDiff(
        details.path.replace(type, 'baseline'), 
        details.path, 
        details.path.replace(type, `${type}-difference`)
      );
      console.log('after:screenshot-3')
    }
    console.log('after:screenshot-4')
  })
}
