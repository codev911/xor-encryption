import { decryptFromHex, encryptFromString, type Encrypted } from '../lib';

let encryptedData: Encrypted;

test('encrypt message', async () => {
  const message = 'Hello, this is a test message to encrypt and decrypt.';
  const key = 'secret_key';
  const result = encryptFromString(message, key);
  encryptedData = result;

  await expect(result).toStrictEqual({
    original_data_hex:
      '0x48656c6c6f2c207468697320697320612074657374206d65737361676520746f20656e637279707420616e6420646563727970742e',
    encrypted_data_hex: expect.anything(),
    encrypted_data_key_hex: expect.anything(),
  });
});

test('decrypt message', async () => {
  const dataHex = encryptedData.encrypted_data_hex;
  const keyKey = encryptedData.encrypted_data_key_hex;
  const result = decryptFromHex(dataHex, keyKey);
  await expect(result).toStrictEqual({
    decrypted_data_hex:
      '0x48656c6c6f2c207468697320697320612074657374206d65737361676520746f20656e637279707420616e6420646563727970742e',
    decrypted_data: 'Hello, this is a test message to encrypt and decrypt.',
  });
});
