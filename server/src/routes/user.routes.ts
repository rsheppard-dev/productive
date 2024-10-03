import { Router } from 'express';
import {
	createUserHandler,
	getUserHandler,
	getUsersHandler,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsersHandler);
router.get('/:cognitoId', getUserHandler);
router.post('/', createUserHandler);

export default router;
