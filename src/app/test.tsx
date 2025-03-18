import { createRandomProduct, createRandomOperation } from 'src/homeworks/ts1/3_write';
const product = createRandomProduct(new Date().toISOString());
const operation = createRandomOperation(new Date().toISOString());

console.log('Product:', product);
console.log('Operation:', operation);
