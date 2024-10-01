import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { projectRoutes, taskRoutes, userRoutes } from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/healthcheck', (_, res) => {
	res.send('API is running OK');
});

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
