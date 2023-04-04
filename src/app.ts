import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './db/setup';
import customerRouter from './api/customer/customer.router'
import billingRouter from './api/billing/billing.router';

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;
        
        this.initialiseMiddleware();
        this.routerConfig();
        this.initialiseDBConnection();
    }

    private initialiseMiddleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(helmet());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false}));
    }

    private initialiseDBConnection() {
        db.connect()
        .then( async () => {
            console.log(`Connected to database server`);
        })
        .catch(err => console.log(`Could not connect to database. ${err}`));
    }

    private routerConfig() {
        this.express.use('/customer', customerRouter);
        this.express.use('/billing', billingRouter);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`app is listening on port ${this.port}`);
        });
    }
}

export default App;