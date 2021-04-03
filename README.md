# gene-finder
A simple server that finds whether a specific gene exists in a DNA file.

The gene can have a predefined prefix (can be configured) and the server is initialized with the DNA file (don't forget to configure it's location too).

If you wish to use this project please read this following README file.


## Installation
Before running the program make sure you install npm packages:
```
npm i
```

To build the ts files and run javascript run the following command:
```
npm start
```
Or, if you want to run it without building javascript files by running:
```
npm run serve-ts
```

## Configuration
You can config some of the variables appearing in the [config file](/src/config.ts), either by changing the default value in the code or by giving the corresponding environment variables.

## The Gene Finder
If you wish to use the gene finder in your own project, you can take it from the [geneFinder folder](/src/geneFinder).

## Potential Issues
- The searching process may take some time depending on the DNA file length. It is advised that your client (the one that sends requests to this server) will use a `Keep-Alive` header because if the DNA file size is in the GBs it may take the server more than a minute to search the whole file.
You can also play with the `CHUNK_SIZE` value (which is the size of the chunk the server process at a given time) to achieve better results. Also, you can deploy several instances of this server that each one of them will process a different section of the DNA file, and run them simultaneously in different cors/machines.
