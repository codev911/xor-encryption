export class Memory {
  memory: any = new Map();
  freeMemoryPointer: number = 0x40;

  constructor() {}

  // Mimic mstore operation
  mstore(position: number, value: Buffer) {
    this.memory.set(position, value);
  }

  // Mimic mload operation
  mload(position: number) {
    return this.memory.get(position) || Buffer.alloc(32);
  }

  // Mimic add operation
  add(value1: number, value2: number) {
    return value1 + value2;
  }

  // Get free memory pointer
  getFreeMemoryPointer() {
    return this.freeMemoryPointer;
  }

  // Set free memory pointer
  setFreeMemoryPointer(value: number) {
    this.freeMemoryPointer = value;
  }
}
