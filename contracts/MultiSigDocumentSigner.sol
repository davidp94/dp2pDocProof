pragma solidity ^0.4.0;


// davidphan.eth
// notarize a document identified by its hash (swarm or ipfs)
// with multiple entities (authorities' addresses)
// with minimum required signatures (multi signatures)
contract MultiSigDocumentSigner {
    
    mapping(address => bool) authorities;
    
    mapping(bytes32 => SignatureCount) documentSignatureCounts;
    
    uint requiredMinSignature;
    
    struct SignatureCount {
        mapping(address => bool) addressWhoHasSigned;
        uint signerCount;
        bool isSigned;
    }
    
    event ContractInit(address _contractAddress, address[] _authorities, uint _minSignature);
    event SignedDocument(bytes32 document, address signer);
    event UnsignedDocument(bytes32 document, address signer);
    event NotarizedDocument(bytes32 document);
    
    modifier isAuthority() {
        require(authorities[msg.sender] == true);
        _;
    }
    
    modifier hasNotSigned(bytes32 document) {
        require(documentSignatureCounts[document].addressWhoHasSigned[msg.sender] == false);
        _;
    }
    
    modifier hasSigned(bytes32 document) {
        require(documentSignatureCounts[document].addressWhoHasSigned[msg.sender] == true);
        _;
    }
    
    modifier isNotSigned(bytes32 document) {
        require(documentSignatureCounts[document].isSigned != true);
        _;
    }
    
    
    function MultiSigDocumentSigner(address[] _authorities, uint minSignature) {
        require(_authorities.length > 0);
        require(minSignature > 0 && minSignature <= _authorities.length);
        uint uniqueAuthorities = 0;
        for (uint i = 0; i < _authorities.length; i++) {
            if(!authorities[address(_authorities[i])]) {
                authorities[address(_authorities[i])] = true;
                uniqueAuthorities += 1;
            }
        }
        require(uniqueAuthorities <= minSignature);
        requiredMinSignature = minSignature;
        ContractInit(this, _authorities, minSignature);
    }
    
    
    function sign(bytes32 document) public isAuthority() hasNotSigned(document) {
        documentSignatureCounts[document].addressWhoHasSigned[msg.sender] = true;
        documentSignatureCounts[document].signerCount++;
        SignedDocument(document, msg.sender);
        if (documentSignatureCounts[document].signerCount >= requiredMinSignature) {
            documentSignatureCounts[document].isSigned = true;
            NotarizedDocument(document);
        }
    }
    
    function unsign(bytes32 document) public isAuthority() isNotSigned(document) hasSigned(document) {
        documentSignatureCounts[document].addressWhoHasSigned[msg.sender] = false;
        documentSignatureCounts[document].signerCount--;
        UnsignedDocument(document, msg.sender);
    }
}
