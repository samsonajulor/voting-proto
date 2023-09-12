// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

interface IBallot {
    function giveRightToVote(address _voter) external;
    function delegate(address _to) external;
    function withdrawDelegation() external;
    function vote(uint256 _CategoryIndex) external;
    function addCategory(string memory _name) external;
    function winningCategory() external view returns (uint winningCategory_);
    function winningCategoryName() external view returns (bytes memory winningCategoryName_);
    function addvotingCategories(string[] memory _names) external;
    function getVotingCategories () external view returns (string[] memory);
}

