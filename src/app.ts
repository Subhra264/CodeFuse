import Express, { Request, Response } from 'express';
import { envConfig as EnvConfig } from '../env';

const PORT = EnvConfig.PORT || 8000;
const app = Express();

app.use(Express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello world!'
    });
});

app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});