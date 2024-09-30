import { Router } from 'express';
import {
	createProjectHandler,
	getProjectsHandler,
} from '../controllers/project.controller';

const router = Router();

router.get('/', getProjectsHandler);
router.post('/', createProjectHandler);

export default router;
