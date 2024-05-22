import "./libs/XOREncryption.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EncryptDecrypt {
    function decrypt(
        bytes memory data,
        bytes memory key
    ) public pure returns (string memory) {
        return string(XOREncryption.encryptDecrypt(data, key));
    }

    function encrypt(
        string memory data,
        bytes memory key
    ) public pure returns (bytes memory) {
        return XOREncryption.encryptDecrypt(bytes(data), key);
    }
}
