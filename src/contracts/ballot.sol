// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Ballot {
    struct Voter {
        uint noOfVotes;
        bool hasVoted;
        uint vote;
    }

    struct Category {
        string name;
        uint voteCount;
    }

    address public moderator;

    mapping(address => Voter) public voters;

    Category[] public votingCategories;

    constructor() {
        moderator = msg.sender;
        voters[moderator].noOfVotes = 1;
    }


    function giveRightToVote(address _voter) public {
        require(msg.sender == moderator, "Only moderator has access");
        require(!voters[_voter].hasVoted, "The voter already voted");
        require(voters[_voter].noOfVotes == 0, "Voter can't vote");
        voters[_voter].noOfVotes = 1;
    }

    function vote(uint256 _CategoryIndex) public {
        Voter storage sender = voters[msg.sender];
        require(sender.noOfVotes > 0, "voter has no right to vote");
        require(!sender.hasVoted, "voter has already voted");

        // Increment the vote count for the chosen Category index
        sender.vote = _CategoryIndex;
        votingCategories[_CategoryIndex].voteCount += sender.noOfVotes;
        sender.noOfVotes = 0;
        sender.hasVoted = true;
    }

    function addCategory(string memory _name) public {
        votingCategories.push(Category({name: _name, voteCount: 0}));
    }

    function winningCategory() public view returns (uint winningCategory_) {
        uint winningVoteCount = 0;
        for (uint prop = 0; prop < votingCategories.length; prop++) {
            if (votingCategories[prop].voteCount > winningVoteCount) {
                winningVoteCount = votingCategories[prop].voteCount;
                winningCategory_ = prop;
            }
        }
    }

    function winningCategoryName () public view returns (string memory winningCategoryName_) {
        winningCategoryName_ = votingCategories[winningCategory()].name;
    }

    function getVotingCategories () public view returns (string[] memory) {
        string[] memory categories = new string[](votingCategories.length);
        for (uint i = 0; i < votingCategories.length; i++) {
            categories[i] = votingCategories[i].name;
        }
        return categories;
    }
}
