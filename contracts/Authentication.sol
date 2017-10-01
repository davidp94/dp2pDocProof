pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct User {
    bytes32 name;
  }

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  function login() constant returns (bytes32) {
    // Require user exists.
    // If yes, return user.

    require(users[msg.sender].name != 0x0);

    return (users[msg.sender].name);
  }

  function signup(bytes32 name) payable returns (bytes32) {
    // Require name to have a value.
    // Check if user exists.
    // If yes, return user name.
    // If no, create and return user.

    require(name != 0x0);

    if (users[msg.sender].name == 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }

    return (users[msg.sender].name);
  }

  function update(bytes32 name) payable returns (bytes32) {
    // Update user name.

    require(name != 0x0);
    require(users[msg.sender].name != 0x0);

    users[msg.sender].name = name;

    return (users[msg.sender].name);
  }
}
