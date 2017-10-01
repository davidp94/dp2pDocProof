var MultiSigDocumentSigner = artifacts.require("./TestMultiSigDocumentSigner.sol");

contract('MultiSigDocumentSigner', function(accounts) {

  it("...should works.", function() {
    return MultiSigDocumentSigner.deployed().then(function(instance) {
      MultiSigDocumentSignerInstance = instance;

    //   return MultiSigDocumentSignerInstance.set(89, {from: accounts[0]});
    // }).then(function() {
    //   return MultiSigDocumentSignerInstance.get.call();
    // }).then(function(storedData) {
      assert.equal(trie, true, "Is not deployed");
    });
  });

});
