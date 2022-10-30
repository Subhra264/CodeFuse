import Express from 'express';
import cors from 'cors';
import { envConfig as EnvConfig } from '@/config/env';

import CodeExplainRoute from '@/routes/codeExplain.route';

const PORT = EnvConfig.PORT || 8000;

const app = Express();
app.use(Express.json({ limit: '25mb' }));
app.use(Express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Code Explain Route
app.use('/code-explain', CodeExplainRoute);

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
