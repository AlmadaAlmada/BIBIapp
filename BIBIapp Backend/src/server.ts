import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/route'; // Suas rotas em TS

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.send('API rodando em TypeScript');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


