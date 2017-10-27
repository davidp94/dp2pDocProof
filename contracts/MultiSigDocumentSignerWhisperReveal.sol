pragma solidity ^0.4.0;


// davidphan.eth
// notarize a document identified by its hash (swarm or ipfs)
// with multiple entities (authorities' addresses)
// with minimum required signatures (multi signatures)
contract MultiSigDocumentSignerWhisperReveal {
    
    mapping(address => bool) public authorities;
    
    mapping(address => string) public authoritiesWhisperPubKeys;
    
    mapping(bytes32 => SignatureCount) public documentSignatureCounts;
    
    uint public requiredMinSignature;
    
    struct SignatureCount {
        mapping(address => bool) addressWhoHasSigned;
        uint signerCount;
        bool isSigned;
        bool isRevealed;
        bytes32 revealedDocument;
    }
    
    event ContractInit(address _contractAddress, address[] _authorities, uint _minSignature);
    event SignedDocument(bytes32 document, address signer);
    event UnsignedDocument(bytes32 document, address signer);
    event DocumentWaitingToBeRevealed(bytes32 document);
    event RevealedDocument(bytes32 signedDocument, bytes32 documentToBeRevealed);
    event NotarizedDocument(bytes32 document);

    event NewAuthorityPubKey(address authority, string pubkey);
    
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
    
    modifier isSigned(bytes32 document) {
        require(documentSignatureCounts[document].isSigned == true);
        _;
    }
    
    modifier isNotRevealed(bytes32 document) {
        require(documentSignatureCounts[document].isRevealed != true);
        _;
    }
    
    
    function MultiSigDocumentSignerWhisperReveal(address[] _authorities, uint minSignature) {
        require(_authorities.length > 0);
        require(minSignature > 0 && minSignature <= _authorities.length);
        uint uniqueAuthorities = 0;
        for (uint i = 0; i < _authorities.length; i++) {
            if(!authorities[address(_authorities[i])]) {
                authorities[address(_authorities[i])] = true;
                uniqueAuthorities += 1;
            }
        }
        require(uniqueAuthorities >= minSignature);
        requiredMinSignature = minSignature;
        ContractInit(this, _authorities, minSignature);
    }
    
    
    function signReveal(bytes32 document) public isAuthority() hasNotSigned(document) {
        documentSignatureCounts[document].addressWhoHasSigned[msg.sender] = true;
        documentSignatureCounts[document].signerCount++;
        SignedDocument(document, msg.sender);
        if (documentSignatureCounts[document].signerCount >= requiredMinSignature) {
            documentSignatureCounts[document].isSigned = true;
            DocumentWaitingToBeRevealed(document);
        }
    }
    
    function unsignReveal(bytes32 document) public isAuthority() isNotSigned(document) hasSigned(document) {
        documentSignatureCounts[document].addressWhoHasSigned[msg.sender] = false;
        documentSignatureCounts[document].signerCount--;
        UnsignedDocument(document, msg.sender);
    }
    
    function setWhisperPubKey(string pubKey) public isAuthority {
        authoritiesWhisperPubKeys[msg.sender] = pubKey;
        NewAuthorityPubKey(msg.sender, pubKey);
    }
    
    function revealDocument(bytes32 documentToBeRevealed, bytes32 salt, bytes32 signedDocument) public isAuthority hasSigned(signedDocument) isNotRevealed(signedDocument) {
        require(keccak256(documentToBeRevealed ^ salt) == signedDocument);
        documentSignatureCounts[signedDocument].isRevealed = true;
        documentSignatureCounts[signedDocument].revealedDocument = documentToBeRevealed;
        RevealedDocument(signedDocument, documentToBeRevealed);
        NotarizedDocument(documentToBeRevealed);        
    }
    

}
