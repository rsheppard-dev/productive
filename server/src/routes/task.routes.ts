import { Router } from 'express';
import {
	createTaskHandler,
	getTasksHandler,
	updateTaskStatusHandler,
} from '../controllers/task.controller';

const router = Router();

router.get('/', getTasksHandler);
router.post('/', createTaskHandler);
router.patch('/:taskId/status', updateTaskStatusHandler);

export default router;
