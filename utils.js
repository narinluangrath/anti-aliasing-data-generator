const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function writeImageDiff(baseline, comparison, difference) {
  const baselineImage = PNG.sync.read(fs.readFileSync(baseline));
  const comparisonImage = PNG.sync.read(fs.readFileSync(comparison));
  
  const { width, height } = baselineImage;
  const differenceImage = new PNG({ width, height });
  
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

function constructFile({ domain, type }) {
  return `${domain}-${type}`; 
}

function deconstructFile(file) {
  const [domain, type] = file.split('-');
  return { domain, type };
}

module.exports = {
  writeImageDiff,
  constructFile,
  deconstructFile,
}