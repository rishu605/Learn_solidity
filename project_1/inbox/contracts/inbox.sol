pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initial_message) public {
        message = initial_message;
    }

    function set_message(string new_message) public {
        message = new_message;
    }
}
