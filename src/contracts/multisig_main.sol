// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

// This is a multisig wallet with multiple admins requiring at list three approvals to execute a transaction
// Functionalities
// 1. Create a multisig wallet
// 2. Add a new admin
// 3. Remove an admin
// 4. Change the number of required approvals
// 5. Submit a transaction
// 6. Confirm a transaction
// 7. Revoke a confirmation
// 8. Execute a transaction
// 9. Get the balance of the wallet
// 10. Get the list of admins
// 11. Get the list of transactions

    struct Transaction {
        address payable spender;
        uint amount;
        uint8 approvals; // number of approvals
        bool isActive;
    }
contract MultiSigMain {
    // State variables
    uint constant MIMUM_ADMIN_COUNT = 3;
    uint public transactionId;
    address[] public admins;

    mapping(address => bool) public isAdmin;
    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public approvals;
    

    error InvalidOrDuplicateAddress(uint position);
    error InvalidNoOfAdmin(uint number);

    modifier OnlyAdmin() {
        require(isAdmin[msg.sender], "Not an admin");
        _;
    }

    // events
    event TransactionCreated(address indexed admin, uint indexed txIndex, address indexed to, uint amount);
    constructor(address[] memory _admins) payable {
        for (uint i = 0; i < _admins.length; i++) {
            if (_admins.length == MIMUM_ADMIN_COUNT) revert InvalidNoOfAdmin(_admins.length);
            if (_admins[i] == address(0) || isAdmin[_admins[i]]) revert InvalidOrDuplicateAddress(i + 1);
            isAdmin[_admins[i]] = true;
        }
        admins = _admins;
    }

    function CreateTransaction(address payable _spender, uint _amount) public OnlyAdmin {
        transactions[transactionId] = Transaction(_spender, _amount, 0, true);
        transactionId += 1;

        emit TransactionCreated(msg.sender, transactionId - 1, _spender, _amount);
    }

    function ApproveTransaction(uint id) external OnlyAdmin {
        require(transactions[id].spender != address(0), "Transaction does not exist");
        require(!approvals[id][msg.sender], "Already approved");
        require(transactions[id].isActive, "Transaction already executed");

        approvals[id][msg.sender] = false;
        transactions[id].approvals += 1;
    }

    function ProcessTransaction() internal {
        require(transactions[transactionId].spender != address(0), "Transaction does not exist");
        require(transactions[transactionId].approvals >= CalculateMinApprovals(), "Not enough approvals");
        require(!transactions[transactionId].isActive, "Transaction already executed");

        transactions[transactionId].spender.transfer(transactions[transactionId].amount);
    }

    // calculate the minimum number of approvals required in percentage of the total admins
    function CalculateMinApprovals() public view returns (uint) {
        return (admins.length * 70) / 100;
    }

    function GetBalance (address _of) public view returns (uint){
        return address(_of).balance;
    }

    function GetTransaction (uint _id) public view returns (Transaction memory) {
        return transactions[_id];
    }


    // fallback
    fallback() external payable {}

    // receive
    receive() external payable {}
}