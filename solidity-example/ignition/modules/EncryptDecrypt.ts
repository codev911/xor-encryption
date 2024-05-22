import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const EncryptDecryptModule = buildModule('EncryptDecryptModule', (m) => {
  const encryptDecrypt = m.contract('EncryptDecrypt');

  return { encryptDecrypt };
});

export default EncryptDecryptModule;
