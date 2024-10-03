import { Router } from 'express';
import {
	createUserHandler,
	deleteUserHandler,
	getUserHandler,
	getUsersHandler,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsersHandler);
router.get('/:cognitoId', getUserHandler);
router.post('/', createUserHandler);
router.delete('/:cognitoId', deleteUserHandler);

export default router;
