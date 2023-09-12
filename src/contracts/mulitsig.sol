// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

// This is a multisig walle with multiple admins requiring at list three approvals to execute a transaction
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


contract Multisig {
    struct Transaction {
        address payable to;
        uint amount;
        uint8 approvals; // number of approvals
        bool executed;
    }

    // State variables
    address[] public admins;
    uint8 public requiredApprovals;
    uint public transactionCount;
    mapping(address => bool) public isAdmin;
    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public approvals;

    // Events
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed admin,
        uint indexed txIndex,
        address indexed to,
        uint amount
    );
    event ConfirmTransaction(address indexed admin, uint indexed txIndex);
    event RevokeApproval(address indexed admin, uint indexed txIndex);
    event ExecuteTransaction(address indexed admin, uint indexed txIndex);

    // Modifiers
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Not an admin");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactionCount, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "Transaction already executed");
        _;
    }

    modifier notApproved(uint _txIndex) {
        require(!approvals[_txIndex][msg.sender], "Transaction already confirmed");
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0), "Cannot be empty address");
        _;
    }

    modifier validRequirement(uint _adminCount, uint _requiredApprovals) {
        require(
            _adminCount <= 10 && _requiredApprovals <= _adminCount && _requiredApprovals != 0,
            "Invalid requirements"
        );
        _;
    }

    // Constructor
    constructor(address[] memory _admins, uint8 _requiredApprovals) validRequirement(_admins.length, _requiredApprovals) {
        for (uint i = 0; i < _admins.length; i++) {
            require(!isAdmin[_admins[i]] && _admins[i] != address(0), "Invalid admin");
            isAdmin[_admins[i]] = true;
        }

        admins = _admins;
        requiredApprovals = _requiredApprovals;
    }

    // Fallback function
    receive() payable external {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }
}