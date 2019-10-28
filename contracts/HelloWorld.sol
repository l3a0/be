pragma solidity ^0.5.0;

contract HelloWorld {
  event Message(string message);

  function Say(string memory message) public {
    emit Message(message);
  }
}