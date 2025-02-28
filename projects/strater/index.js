const ADDRESSES = require("../helper/coreAssets.json");
const sui = require("../helper/chain/sui");
const { addUniV3LikePosition } = require("../helper/unwrapLPs");

const BUCKETUS_VAULT_ID =
  "0x1a0b93fd2965ce3ceb4039c90b232ddee7b0e79015cab0ca10528bb5f4285188";
const BUCK_USDC_POOL_ID =
  "0x6ecf6d01120f5f055f9a605b56fd661412a81ec7c8b035255e333c664a0c12e7";

const FEE_RATE_BUCKETUS_VAULT_ID =
  "0x6edfc992f6e775fe926a5e850661c151ad01e6149e9b34792a2102e1721065fc";
const FEE_RATE_BUCK_USDC_POOL_ID =
  "0x81fe26939ed676dd766358a60445341a06cea407ca6f3671ef30f162c84126d5";

const CETABLE_VAULT_ID =
  "0xeed4e7948f88f1f044b653717a7855eef6fe188e9cbbb103d5169f9bc3edd257";
const USDC_USDT_POOL_ID =
  "0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20";

function asIntN(int, bits = 32) {
  return Number(BigInt.asIntN(bits, BigInt(int)));
}

async function tvl(_, _1, _2, { api }) {
  const bucketusVaultObjs = await sui.getObject(BUCKETUS_VAULT_ID);
  const bucketusPoolObjs = await sui.getObject(BUCK_USDC_POOL_ID);

  const bucketusPool = bucketusPoolObjs.fields;
  const bucketusPosition = bucketusVaultObjs.fields.position.fields;

  addUniV3LikePosition({
    api,
    tickLower: asIntN(bucketusPosition.tick_lower_index.fields.bits),
    tickUpper: asIntN(bucketusPosition.tick_upper_index.fields.bits),
    tick: asIntN(bucketusPool.current_tick_index.fields.bits),
    liquidity: bucketusPosition.liquidity,
    token0: ADDRESSES.sui.BUCK,
    token1: ADDRESSES.sui.USDC,
  });

  const feeRateBucketusVaultObjs = await sui.getObject(
    FEE_RATE_BUCKETUS_VAULT_ID
  );
  const feeRateBucketusPoolObjs = await sui.getObject(
    FEE_RATE_BUCK_USDC_POOL_ID
  );

  const feeRateBucketusPool = feeRateBucketusPoolObjs.fields;
  const feeRateBucketusPosition =
    feeRateBucketusVaultObjs.fields.position.fields;

  addUniV3LikePosition({
    api,
    tickLower: asIntN(feeRateBucketusPosition.tick_lower_index.fields.bits),
    tickUpper: asIntN(feeRateBucketusPosition.tick_upper_index.fields.bits),
    tick: asIntN(feeRateBucketusPool.current_tick_index.fields.bits),
    liquidity: feeRateBucketusPosition.liquidity,
    token0: ADDRESSES.sui.BUCK,
    token1: ADDRESSES.sui.USDC,
  });

  const cetableVaultObjs = await sui.getObject(CETABLE_VAULT_ID);
  const cetablePoolObjs = await sui.getObject(USDC_USDT_POOL_ID);

  const cetablePool = cetablePoolObjs.fields;
  const cetablePosition = cetableVaultObjs.fields.position.fields;

  addUniV3LikePosition({
    api,
    tickLower: asIntN(cetablePosition.tick_lower_index.fields.bits),
    tickUpper: asIntN(cetablePosition.tick_upper_index.fields.bits),
    tick: asIntN(cetablePool.current_tick_index.fields.bits),
    liquidity: cetablePosition.liquidity,
    token0: ADDRESSES.sui.USDT,
    token1: ADDRESSES.sui.USDC,
  });
}

module.exports = {
  timetravel: false,
  sui: {
    tvl,
  },
};
