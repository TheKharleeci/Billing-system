import express, {Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { connection } from './db/setup';
import router from './api/gateway';
import config from './config/setup';
import { processTransaction } from './api/billing-worker/billing.services';

export const app: Application = express();

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

router(app);

app.get('/', (req: Request, res: Response) => {  
    res.send('Welcome to Billing app')
});

const port = config?.PORT || 8080;

connection(app, port);

processTransaction()

