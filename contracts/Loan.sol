//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Loan {
    address public lender;
    address public borrower;
    uint256 public loanAmount;
    uint256 public dueDate;

    constructor(
        address _lender,
        address _borrower,
        uint256 _loanAmount,
        uint256 _loanDuration
    ) {
        lender = _lender;
        borrower = _borrower;
        loanAmount = _loanAmount;
        dueDate = _loanDuration + block.timestamp;
    }

    event LoanPaid(uint256 payTime);

    function updateLoanAmount(uint256 _loanAmountOffset) private {
        loanAmount -= _loanAmountOffset;
        emit LoanPaid(block.timestamp);
    }

    function partPayment() public payable {
        require(block.timestamp <= dueDate);
        payable(lender).transfer(msg.value);
        updateLoanAmount(msg.value);
    }

    function preClosure() public payable {
        require(msg.value == loanAmount, "Pay off amount value isn't correct");
        payable(lender).transfer(msg.value);
        updateLoanAmount(0);
        finalize();
    }

    function finalize() private {
        selfdestruct(payable(lender));
    }
}
