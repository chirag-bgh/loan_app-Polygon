const {expect} = require('chai')
const { ethers } = require('hardhat')

describe("Testing the lendMatic() function", () => {
    let signers, LoanRequest, loanRequest, overrides, loanPurpose, loanAmount, loanDuration, borrower, lender
    beforeEach(async () => {
        signers = await ethers.getSigners()
        borrower = signers[0]
        lender = signers[1]
        loanPurpose = "aish"
        loanAmount = ethers.utils.parseEther("0.000000001")
        loanDuration = 100000000000
        overrides = {
            value: loanAmount,
            from: signers[1].address
        }
        LoanRequest = await ethers.getContractFactory("LoanRequest")
        loanRequest = await LoanRequest.deploy(
            loanPurpose,
            loanAmount,
            loanDuration
        )               
    })

    it("should lend matic tokens to the borrower", async () => {
        await loanRequest.connect(lender).lendMatic(overrides)
        expect(await loanRequest.accepted()).to.equal(true)
    })

})