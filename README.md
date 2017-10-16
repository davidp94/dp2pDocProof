*Work in progress.*

prove that you signed a document on the blockchain with multiple authorities involved.

use cases:

- proof of existence :

Bob writes a patent and his ethereum address is verified by PICOPS ( https://picops.parity.io/ ).
he can prove that he had this idea in the future.


- press release

Companies are now facing fake news releases - it is hard to trace from where the fake news is originating from.
Company could state that all C-levels (let's say `4`) members can sign documents using their proven ethereum address; and only 2 signatures are needed to "notarize" a document.
News companies (Reuters AFP...) will just have to "listen" to the `NotarizedDocument` event of the smart contract


- legally binding document

Alice and Bob (or Company A and B) are signing a contract online - today we sign and send the scanned copy back.

Using this dApp, they will just have to deploy this smart contract with both of their addresses as authorities with `minRequiredSignature = 2`
Signing the document could digitalize in a secure manner the signature of their contract.



## How to use it / deploy it 

- *Work in progress* - it is based on truffle

Planned features: 

- sign only feature (not uploading the document to Swarm) for private documents.

- enable people to modify the authorities or block the contract and give a new smart contract address with the new authorities (in case of an authority get hacked).

- enable people to send Whisper messages to authorities in order to ask them to sign the document.
authorities could generate a Whisper identity and update it on the smart contract so they can be contacted by trusted ones.

- ??
