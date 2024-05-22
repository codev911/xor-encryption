import keccak from 'keccak';
import { Memory } from './utils/memory';
import { encrypted } from './interface/encrypted.interface';
import { decrypted } from './interface/decypted.interface';

const keccak256 = (data: Buffer) => {
  return keccak('keccak256').update(data).digest();
};

const encodePacked = (...args: any) => {
  return Buffer.concat(
    args.map((arg) => {
      if (Buffer.isBuffer(arg)) {
        return arg;
      } else if (typeof arg === 'string') {
        return Buffer.from(arg, 'utf-8');
      } else if (typeof arg === 'number') {
        const buf = Buffer.alloc(32);
        buf.writeUInt32BE(arg, 28); // write number at the end (big-endian)
        return buf;
      }
      throw new Error('Unsupported type');
    }),
  );
};

const encryptDecrypt = (data: any, key: any) => {
  const memory = new Memory();
  const length = data.length;
  const result = Buffer.alloc(length);

  // Set result to free memory pointer
  let resultPointer = memory.getFreeMemoryPointer();
  memory.mstore(resultPointer, result);
  memory.setFreeMemoryPointer(
    memory.add(memory.getFreeMemoryPointer(), length + 32),
  );

  // Set result length
  memory.mstore(resultPointer, length);

  // Iterate over the data stepping by 32 bytes
  for (let i = 0; i < length; i += 32) {
    const hash = keccak256(encodePacked(key, i));
    const chunk = data.slice(i, i + 32);
    const encryptedChunk = Buffer.alloc(chunk.length);

    for (let j = 0; j < chunk.length; j++) {
      encryptedChunk[j] = chunk[j] ^ hash[j];
    }

    memory.mstore(memory.add(resultPointer, i + 32), encryptedChunk);
  }

  // Construct the final result
  const finalResult = Buffer.alloc(length);
  for (let i = 0; i < length; i += 32) {
    const chunk = memory.mload(memory.add(resultPointer, i + 32));
    chunk.copy(finalResult, i, 0, chunk.length);
  }

  return finalResult;
};

export type Encrypted = encrypted;
export type Decrypted = decrypted;

export const encryptFromString = (data: string, key: string): Encrypted => {
  const dataProcess = Buffer.from(data, 'utf-8');
  const keyProcess = Buffer.from(key, 'utf-8');
  const encrypted = encryptDecrypt(dataProcess, keyProcess);

  return {
    original_data_hex: `0x${dataProcess.toString('hex')}`,
    encrypted_data_hex: `0x${encrypted.toString('hex')}`,
    encrypted_data_key_hex: `0x${keyProcess.toString('hex')}`,
  };
};

export const decryptFromHex = (dataHex: string, keyHex: string): Decrypted => {
  const dataProcess = Buffer.from(dataHex.replace('0x', ''), 'hex');
  const keyProcess = Buffer.from(keyHex.replace('0x', ''), 'hex');
  const decrypted = encryptDecrypt(dataProcess, keyProcess);

  return {
    decrypted_data_hex: `0x${decrypted.toString('hex')}`,
    decrypted_data: decrypted.toString('utf-8'),
  };
};
