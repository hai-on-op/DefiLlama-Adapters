async function tvl(_, _1, _2, {api}) {
    const depositedMetis = await api.call({
        abi: 'function totalDeposits() view returns (uint256)',
        target: '0x96C4A48Abdf781e9c931cfA92EC0167Ba219ad8E'
    });

    api.add('0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', depositedMetis);
}

module.exports = {
    metis: {
        tvl
    }
};
