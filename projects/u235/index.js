const { aaveExports } = require('../helper/aave');
const methodologies = require('../helper/methodologies');

module.exports = {
  methodology: methodologies.lendingMarket,
  scroll: aaveExports('scroll', undefined, undefined, ['0xeB3C203418f0cb55b351C3E45A5C4f47bE5DA77A']),
}