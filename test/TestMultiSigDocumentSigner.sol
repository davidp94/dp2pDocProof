pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MultiSigDocumentSigner.sol";

contract TestMultiSigDocumentSigner {

  function testItConstructs() {
    MultiSigDocumentSigner ds = MultiSigDocumentSigner(DeployedAddresses.MultiSigDocumentSigner());

    // simpleStorage.set(89);

    // uint expected = 89;

    // Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");

    Assert.equal(true, true, 'Is true');
  }

}
