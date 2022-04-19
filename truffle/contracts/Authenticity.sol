pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Authenticity {

  // event that will be fired when a file is certified.
  event DocumentSigned(address author, string hash, uint timestamp, uint size, string docType);

  //struct that describes a signature for a document
  struct Signature {
    address author;
    string hash;
    uint timestamp;
    uint size;
    string docType;
  }

  //map that will store the signatures by hash
  mapping (string => Signature) signaturesMap;
  //array for signatures
  Signature[] signaturesArray;

  //function used for signing a document
  function signDocument(uint size, string memory hash, string memory docType) public payable {
    require((signaturesMap[hash].size == 0 &&
              keccak256(abi.encodePacked(signaturesMap[hash].hash)) == keccak256(abi.encodePacked("")) &&
              keccak256(abi.encodePacked(signaturesMap[hash].docType)) == keccak256(abi.encodePacked(""))),
            "document already signed");


      Signature memory newSignature = Signature(msg.sender, hash, block.timestamp, size, docType);
      signaturesMap[hash] = newSignature;
      signaturesArray.push(newSignature);
      emit DocumentSigned(msg.sender, hash, block.timestamp, size, docType);


  }

  //function used for checking if a document has been sign; returns a signature for a given document hash
  function verifyDocument(string memory hash) public view returns (address, string memory, uint, uint, string memory) {
    return (
            signaturesMap[hash].author,
            signaturesMap[hash].hash,
            signaturesMap[hash].timestamp,
            signaturesMap[hash].size,
            signaturesMap[hash].docType
    );
  }

  //function used for returning an array of signatures associated with an account
  function getSignatures() public view returns (Signature[] memory){
    uint count = 0;
    for (uint i = 0; i < signaturesArray.length; i++) {
      Signature storage signature = signaturesArray[i];
      if(keccak256(abi.encodePacked(signature.author)) == keccak256(abi.encodePacked(msg.sender))){
        count++;
      }
    }

    Signature[] memory newArray = new Signature[](count);
    uint j = 0;
    for (uint i = 0; i < signaturesArray.length; i++) {
      Signature storage signature = signaturesArray[i];
      if(keccak256(abi.encodePacked(signature.author)) == keccak256(abi.encodePacked(msg.sender))){
        newArray[j] = signature;
        j = j + 1;
      }
    }
    return newArray;
  }
}


