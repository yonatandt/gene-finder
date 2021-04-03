// A script to generate random DNA file (with the ACGT letters in a random order).
// To change the size of the wanted output file please change the CHUNK_AMOUNT value.
// To change the name of the wanted output file please change the OUTPUT_FILE value.
import * as fs from 'fs';

const DNA_LETTER = ['A', 'C', 'G', 'T'];
const CHUNK_SIZE = 100000;
const CHUNK_AMOUNT = 10000;
const OUTPUT_FILE = '../../test/output';

const writeStream = fs.createWriteStream(OUTPUT_FILE);

for (let k = 0; k < CHUNK_AMOUNT; k++) {
  let letters = '';
  for (let i = 0; i < CHUNK_SIZE; i++) {
    const letter = DNA_LETTER[Math.floor(Math.random() * 4)];
    letters += letter;
  }
  writeStream.write(letters, 'utf8');
}
