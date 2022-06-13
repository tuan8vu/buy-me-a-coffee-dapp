//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// contract deploy: 0xA5E881900663d017490Bc75755F3637C3a495Bd0

contract BuyMeACoffee {
    // event to emit when a Memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // list of Memos received from friends
    // The variable `memos` is an array of type `Memo`.
    Memo[] memos;


    // Address of contract deployer
    address payable owner;

    // Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value >0, "Can't buy a coffee for 0 ETH");

        // Add the momo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit the NewMemo event
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }
    // The owner.send(address(this).balance) is the code
    // that sends the balance of the contract to the owner.
    // address(this).balance refers to the contract ether balance
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    // retrieve all the momos received and store on the blockchain
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

}
