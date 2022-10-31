import Express from 'express';
import cors from 'cors';
import { envConfig as EnvConfig } from '@/config/env';

import { CodeExplainRoute, TimeComplexityRoute, SqlTranslateRoute } from '@/routes';

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

// Calculate time complexity route
app.use('/time-complexity', TimeComplexityRoute);

// SQL Translate Route
app.use('/sql-translate', SqlTranslateRoute);

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
