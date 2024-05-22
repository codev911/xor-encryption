import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  decryptFromHex,
  encryptFromString,
  type Encrypted,
  type Decrypted,
} from '../../lib';

const textData = 'Hello, this is a test message to encrypt and decrypt.';
const key = 'secret_key';

let tempKey: string;
let tempEncrypted: string;
let tempData: string;

async function deploy() {
  const EncryptDecrypt = await ethers.getContractFactory(
    'contracts/encryptDecrypt.sol:EncryptDecrypt',
  );
  const encryptDecrypt = await EncryptDecrypt.deploy();

  return { encryptDecrypt };
}

async function decrypt(sc: any, data: any, key: any, res: any) {
  expect(await sc.decrypt(data, key)).to.equal(res);
}
async function encrypt(sc: any, data: any, key: any, res: any) {
  expect(await sc.encrypt(data, key)).to.equal(res);
}

describe('Start testing', function () {
  describe('Encrypt on JS, Decrypt on Solidity', function () {
    it('should have successfully call decrypt', async function () {
      const { encryptDecrypt } = await loadFixture(deploy);
      const result: Encrypted = encryptFromString(textData, key);

      tempEncrypted = result.encrypted_data_hex;
      tempData = result.original_data_hex;
      tempKey = result.encrypted_data_key_hex;

      await decrypt(
        encryptDecrypt,
        result.encrypted_data_hex,
        result.encrypted_data_key_hex,
        textData,
      );
    });
  });
  describe('Encrypt on Solidity, Decrypt on JS', function () {
    it('should have successfully call encrypt', async function () {
      const { encryptDecrypt } = await loadFixture(deploy);

      await encrypt(encryptDecrypt, textData, tempKey, tempEncrypted);

      const result: Decrypted = decryptFromHex(tempEncrypted, tempKey);
      expect(result).to.deep.equal({
        decrypted_data_hex: tempData,
        decrypted_data: textData,
      });
    });
  });
});
