import 'dotenv/config';
import pg from 'pg-promise';
import promise from 'bluebird';

const options = {
  promiseLib: promise
};

const pgp = pg(options);
const db = pgp(String(process.env.DATABASE_URL));

export default db;