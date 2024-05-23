# xor-encryption
Encrypt and decrypt string data using the XOR encryption method to make it easier.

## Install

1. Via NPM : `npm i xor-encryption`
2. Via Yarn : `yarn add xor-encryption`

## Import

1. CJS : `const { encryptFromString, decryptFromHex } = require('xor-encryption')`
2. ESM : `import { encryptFromString, decryptFromHex } from 'xor-encryption'`

## Use library on JavaScript / TypeScript

### A. encryptFromString
```JavaScript
    import { encryptFromString } from 'xor-encryption';
    // if use commonjs use this :
    // const { encryptFromString } = require('xor-encryption');

    // example data and key
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const ket = 'secret_key';

    // example function for test
    function test(){
        console.log(encryptFromString(data, key));
    }
    test();

    // result will be like
    // {
    //     original_data_hex: '0x4c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742c2073656420646f20656975736d6f642074656d706f7220696e6369646964756e74207574206c61626f726520657420646f6c6f7265206d61676e6120616c697175612e',
    //     encrypted_data_hex: '0xaeaddfcd73cce37e40bbc187304afb71ede938b106ec028fb3d232e8d4000079bcb79494698671459c252d53f7c38ec0cada4739f024d284f0387b1917a9cf1743ab90c53a80415a0032fb0dae12f539a3170376f259bc9f3148bb55b9366e8cdbc377b93aadbee756b9e48a399fd3b47510bea9d763b6759ee242',
    //     encrypted_data_key_hex: '0x3cc963733f9fa1f6b6ab36672002b216c9b43243ff812364f57df5b3d135bc41'
    // }
```

### B. decryptFromHex
```JavaScript
    import { decryptFromHex } from 'xor-encryption';
    // if use commonjs use this :
    // const { decryptFromHex } = require('xor-encryption');

    // example encrypted data and key on hex
    const data = '0xaeaddfcd73cce37e40bbc187304afb71ede938b106ec028fb3d232e8d4000079bcb79494698671459c252d53f7c38ec0cada4739f024d284f0387b1917a9cf1743ab90c53a80415a0032fb0dae12f539a3170376f259bc9f3148bb55b9366e8cdbc377b93aadbee756b9e48a399fd3b47510bea9d763b6759ee242';
    const key = '0x3cc963733f9fa1f6b6ab36672002b216c9b43243ff812364f57df5b3d135bc41';

    // example function for test
    function test(){
        console.log(decryptFromHex(data, key));
    }
    test();

    // result will be like
    // {
    //     decrypted_data_hex: '0x4c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742c2073656420646f20656975736d6f642074656d706f7220696e6369646964756e74207574206c61626f726520657420646f6c6f7265206d61676e6120616c697175612e',
    //     decrypted_data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    // }
```

## Use library on Solidity

You can import this library into Solidity with the example:
```Solidity
import "xor-encryption/dist/contracts/XOREncryption.sol";

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
```
Learn more in the [examples](https://github.com/codev911/xor-encryption/tree/main/solidity-example) section.