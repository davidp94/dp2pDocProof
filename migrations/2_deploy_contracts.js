var MultiSigDocumentSigner = artifacts.require("./MultiSigDocumentSigner.sol");

module.exports = function(deployer) {
  deployer.deploy(MultiSigDocumentSigner, [
    "0x940045eeb3a962005486f7d63cacd437df0b00a1",
    "0x13e259b83f6bb0b345afd600973d5145a7281be0",
    "0x07bbabfe4540441452c2e1cf6285cf8fca166378",
    "0x1dbd7eb76300690ce0bc2091ea2e27a9d3a477c7",
    "0x66660b1221ffa6871d4132e0e5ca5c8b8c767fd6",
    "0x65515eb567b6dd84a7a254ef806ccf1cab9009df",
    "0x9a21441d448d5db6536a62f1c217ef4356b47cc0"
  ], 3);
};
