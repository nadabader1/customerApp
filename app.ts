

import express from 'express';
import { createConnection } from 'typeorm';
import customerRoutes from './routes/customerRoutes';
import { customErrorHandler } from './middleware/errorHandler';


const app = express();
app.use(express.json());

createConnection().then(connection => {
    app.use('/customers', customerRoutes);
    app.use(customErrorHandler);
    
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(error => console.log("TypeORM connection error: ", error));