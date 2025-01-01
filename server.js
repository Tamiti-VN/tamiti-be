import { app } from './src/app.js';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log('Express Server is closed!!'));
});
