const { expect } = require('chai');

const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Box = artifacts.require('Box');

// Start test Block
contract('Box', function([ owner, other ]) {
    // Use large integers ('big numbers')
    const value = new BN('42');
    const value99 = new BN('99');

    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.box = await Box.new( { from: owner });
    })

    // Test case
    it('retrieve returns a value previously stored', async function () {
        // Store a value
        await this.box.store(value, { from: owner });

        // Use larger integer comparisons
        expect(await this.box.retrieve()).to.be.bignumber.equal(value);
    });

    it('store emits an event', async function () {
        const receipt = await this.box.store(value, { from: owner });

        // Test that a ValueChanged event was emitted with the new value
        expectEvent(receipt, 'ValueChanged', { value: value });
    });

    it('non owner cannot store a value', async function () {
        // Test a transaction reverts
        await expectRevert(this.box.store(value, { from: other}),
        'Ownable: caller is not the owner',
        );
    });
});