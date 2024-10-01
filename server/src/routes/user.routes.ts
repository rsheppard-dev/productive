import { Router } from 'express';
import {
	createUserHandler,
	getUsersHandler,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsersHandler);
router.post('/', createUserHandler);

export default router;
