pragma solidity ^0.4.0;


// davidphan.eth
// manage a registry of doc proof contracts
// useful in order to decide of trusted sources by a governance
// with multiple entities (authorities' addresses)
// with minimum required signatures (multi signatures)
contract DocRegistry {
    
    mapping(address => bool) public authorities;
    
    mapping(address => RegistryAddressProposal) public registryAddressSignatureCounts;
    
    uint public requiredMinSignature;
    
    struct RegistryAddressProposal {
        mapping(address => bool) addressWhoHasVoted;
        uint voteCount;
        bool isTrusted;
    }
    
    event ContractInit(address _contractAddress, address[] _authorities, uint _minSignature);
    event VotedRegistryAddress(address docProofAddress, address signer);
    event UnvotedRegistryAddress(address docProofAddress, address signer);
    event TrustedRegistryAddress(address docProofAddress);

    
    modifier isAuthority() {
        require(authorities[msg.sender] == true);
        _;
    }
    
    modifier hasNotVoted(address docProofAddress) {
        require(registryAddressSignatureCounts[docProofAddress].addressWhoHasVoted[msg.sender] == false);
        _;
    }
    
    modifier hasVoted(address docProofAddress) {
        require(registryAddressSignatureCounts[docProofAddress].addressWhoHasVoted[msg.sender] == true);
        _;
    }
    
    modifier isNotTrusted(address docProofAddress) {
        require(registryAddressSignatureCounts[docProofAddress].isTrusted != true);
        _;
    }
    
    modifier isTrusted(address docProofAddress) {
        require(registryAddressSignatureCounts[docProofAddress].isTrusted == true);
        _;
    }
    
    
    function DocRegistry(address[] _authorities, uint minSignature) public {
        require(_authorities.length > 0);
        require(minSignature > 0 && minSignature <= _authorities.length);
        uint uniqueAuthorities = 0;
        for (uint i = 0; i < _authorities.length; i++) {
            if (!authorities[address(_authorities[i])]) {
                authorities[address(_authorities[i])] = true;
                uniqueAuthorities += 1;
            }
        }
        require(uniqueAuthorities >= minSignature);
        requiredMinSignature = minSignature;
        ContractInit(this, _authorities, minSignature);
    }
    
    
    function voteRegistryAddress(address docProofAddress) public isAuthority() hasNotVoted(docProofAddress) {
        registryAddressSignatureCounts[docProofAddress].addressWhoHasVoted[msg.sender] = true;
        registryAddressSignatureCounts[docProofAddress].voteCount++;
        VotedRegistryAddress(docProofAddress, msg.sender);
        if (registryAddressSignatureCounts[docProofAddress].voteCount >= requiredMinSignature) {
            registryAddressSignatureCounts[docProofAddress].isTrusted = true;
            TrustedRegistryAddress(docProofAddress);
        }
    }
    
    function unvoteRegistryAddress(address docProofAddress) public isAuthority() isNotTrusted(docProofAddress) hasVoted(docProofAddress) {
        registryAddressSignatureCounts[docProofAddress].addressWhoHasVoted[msg.sender] = false;
        registryAddressSignatureCounts[docProofAddress].voteCount--;
        UnvotedRegistryAddress(docProofAddress, msg.sender);
    }
    

}
