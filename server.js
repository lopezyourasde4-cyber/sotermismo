import express from 'express';
import { createServer } from 'http';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

createServer(app).listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Aura Mystica en ejecución:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Red:     http://<tu-ip>:${PORT}\n`);
});
