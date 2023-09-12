// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import {Transaction} from '../multisig_main.sol';

import {MultiSig} from "../multisigWura.sol";

interface IMultiSigWura {
    function createMultisig(address[] memory _admins) external  returns (MultiSig) ;
    function getAllMultisig() external view returns (MultiSig[] memory);
}