// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import {MultiSigMain} from './multisig_main.sol';

// create a factory contract to create new multisig wallets

contract MultiSigFactory {
    address[] public deployedWallets;

    event CreateMultiSigWalletEvent(
        address indexed newWallet,
        address indexed from,
        address[] admins
    );

    function CreateMultiSigWallet(address[] memory _admins) public payable {
        address newWallet = address(new MultiSigMain(_admins));
        deployedWallets.push(newWallet);
        emit CreateMultiSigWalletEvent(newWallet, msg.sender, _admins);
    }

    function GetDeployedWallets() public view returns (address[] memory) {
        return deployedWallets;
    }
}
