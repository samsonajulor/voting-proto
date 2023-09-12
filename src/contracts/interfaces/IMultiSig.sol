// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import {Transaction} from '../multisig_main.sol';

// create a multisig interface
interface IMultiSig {
    // events
    event TransactionCreated(address indexed admin, uint indexed txIndex, address indexed to, uint amount);
    event TransactionApproved(address indexed admin, uint indexed txIndex);
    event TransactionRevoked(address indexed admin, uint indexed txIndex);
    event TransactionExecuted(address indexed admin, uint indexed txIndex);

    // functions
    function CreateTransaction(address payable _spender, uint _amount) external;
    function ApproveTransaction(uint id) external;
    function RevokeApproval(uint id) external;
    function ProcessTransaction() external;
    function GetBalance (address _of) external view returns (uint);
    function GetTransaction (uint _id) external view returns (Transaction memory);
}

