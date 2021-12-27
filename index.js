const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const base = path.resolve(__dirname, 'cypress/screenshots/index.spec.js/', 'google-baseline.png');
const compare = path.resolve(__dirname, 'cypress/screenshots/index.spec.js/', 'google-regression.png');
const diff = './diffence.png';

getImageDiff(base, compare, diff)

function getImageDiff(baseline, comparison, difference) {
  const baselineImage = PNG.sync.read(fs.readFileSync(baseline));
  const comparisonImage = PNG.sync.read(fs.readFileSync(comparison));
  
  const {width, height} = baselineImage;
  const differenceImage = new PNG({width, height});
  
  const threshold = 0 // 0.1
  const result = pixelmatch(
    baselineImage.data,
    comparisonImage.data,
    differenceImage.data,
    width,
    height,
    {threshold}
  );
  
  console.log(`Result: ${result}`);
  fs.writeFileSync(difference, PNG.sync.write(differenceImage));
}