export default {
  server: {
    port: process.env.PORT || '8000',
  },
  gene: {
    prefix: process.env.GEN_PREFIX || 'AAAAAAAAAAA',
  },
  dnaFileLocation: process.env.DNA_LOCATION || '../../test/test2',
};
