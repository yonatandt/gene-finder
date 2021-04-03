import { once } from 'events';
import * as express from 'express';
import * as http from 'http';
import * as logger from 'morgan';
import config from './config';
import { wrapAsync } from './utils/wrapAsync';
import { isGeneInDnaFile, isGenePrefixValid } from './geneFinder';

export default class Server {
  app: express.Application;

  private http: http.Server | undefined;

  private port: string;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    this.configureMiddleware();
    this.configureApiRoutes();
  }

  private configureMiddleware() {
    this.app.use(logger('tiny'));
  }

  private configureApiRoutes() {
    // Is Alive
    this.app.get('/isAlive', (req, res) => {
      res.status(200).send('alive');
    });

    this.app.get('/genes/find/:gene', wrapAsync(async (req: express.Request, res: express.Response) => {
      const { gene } = req.params;
      if (!isGenePrefixValid(gene)) {
        res.status(400).send(`The given Gene: ${gene} is not from the support template (${config.gene.prefix} prefix)`);
        return;
      }
      const isGeneInFile = await isGeneInDnaFile(gene, config.dnaFileLocation);
      if (isGeneInFile) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }));
  }

  public async start() {
    this.http = this.app.listen(this.port);
    await once(this.http, 'listening');
  }
}

const main = async () => {
  const server = new Server(config.server.port);

  await server.start();

  console.log(`Server started on port: ${config.server.port}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
