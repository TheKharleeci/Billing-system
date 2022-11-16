/* eslint-disable no-async-promise-executor */
import 'dotenv/config';
import pgp from 'pg-promise';
import promise from 'bluebird';
import config from '../config/setup';
import { logger } from '../utils/helpers.hash';

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg({
  host: config?.DATABASE_HOST,
  port: parseInt(config?.DATABASE_PORT || "5432"),
  database: config?.DATABASE_NAME,
  user: config?.DATABASE_USER,
  password: config?.DATABASE_PASSWORD,
});
const connection = (app:any, port:any) => new Promise(async resolve => {
  const server = app.listen(port, () => {
    logger.info(`Listening on port ${server.address().port}`);
    const originalClose = server.close.bind(server);
    server.close = () => new Promise(resolveClose => {
      originalClose(resolveClose);
    });
    db
      .connect()
      .then(conn => {
        logger.info(
          `connected to ${conn.client.database} database`,
        );
      })
      .catch(err => {
        logger.error(err, 'err');
      });
  });
  resolve(server);
});


export { db, connection };
