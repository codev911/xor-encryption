import { decryptFromHex, encryptFromString } from '../lib';

test('encrypt message', async () => {
    const message = 'Hello, this is a test message to encrypt and decrypt.';
    const key = 'secret_key';
	const result = encryptFromString(message, key);
	await expect(result).toStrictEqual({
        original_data_hex: '0x48656c6c6f2c207468697320697320612074657374206d65737361676520746f20656e637279707420616e6420646563727970742e',
        encrypted_data_hex: '0x3b1dd23d6228d077b1d760beb5a0d9f5b92323103c5ef046069d94112472bf326586eaeb0aed0d7b2d6565a545e6f0e3c83326610a',
        encrypted_data_key_hex: '0x7365637265745f6b6579',
    });
});

test('decrypt message', async () => {
    const dataHex = '0x3b1dd23d6228d077b1d760beb5a0d9f5b92323103c5ef046069d94112472bf326586eaeb0aed0d7b2d6565a545e6f0e3c83326610a';
    const keyKey = '0x7365637265745f6b6579';
	const result = decryptFromHex(dataHex, keyKey);
	await expect(result).toStrictEqual({
        decrypted_data_hex: '0x48656c6c6f2c207468697320697320612074657374206d65737361676520746f20656e637279707420616e6420646563727970742e',
        decrypted_data: 'Hello, this is a test message to encrypt and decrypt.',
      });
});