import * as fs from 'fs';
import * as path from 'path';
import config from '../config';

const CHUNK_SIZE = 1000;

/**
 * isGeneInDnaFile searches for a gene in a DNA file, and returns whether the gene is in the file or not.
 * @param gene - the gene sequence to find.
 * @param dnaFileLocation - the location of the DNA file.
 * @param chunkSize (optional) - the size of each chunk when reading the DNA file (for optimizations reasons).
 */
export const isGeneInDnaFile = async (gene: string, dnaFileLocation: string, chunkSize = CHUNK_SIZE): Promise<boolean> => {
  const absolutePath = path.join(__dirname, dnaFileLocation);
  const readable = fs.createReadStream(absolutePath, {
    encoding: 'utf8',
  });
  let geneCandidates:string[] = [];
  let isGeneFound = false;
  const result = new Promise((resolve, reject) => {
    readable.on('readable', () => {
      let chunk: string;
      while ((chunk = readable.read(chunkSize)) !== null) {
        for (let l = 0, len = chunk.length; l < len; l++) {
          const letter = chunk[l];
          const updatedGeneCandidates: string[] = [];
          geneCandidates.forEach((geneCandidate) => {
            const index = geneCandidate.length;
            if (gene[index] === letter) {
              if (geneCandidate + letter === gene) {
                // The Gene was found!
                isGeneFound = true;
                readable.close(); // This may not close the stream.
                readable.push(null);
                readable.read(0);
                resolve(true);
                return;
              }
              updatedGeneCandidates.push(geneCandidate + letter);
            }
          });
          if (isGeneFound) return;
          if (gene[0] === letter) {
            updatedGeneCandidates.push(letter);
          }
          geneCandidates = updatedGeneCandidates;
        }
      }
    });
    readable.on('end', () => {
      resolve(false);
    });
  });
  await result.then().catch((err) => console.log(`Unexpected error: ${err}`));
  return isGeneFound;
};

/**
 * isGenPrefixValid - returns whether a given gene has a valid prefix.
 * @param gene - the gene to check.
 */
export const isGenePrefixValid = (gen: string): boolean => gen.startsWith(config.gene.prefix);
