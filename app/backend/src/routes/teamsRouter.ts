import { Router } from 'express';
import teamController from '../controllers/teamsController';

const router = Router();

router.get('/', (req, res) => teamController.getAll(req, res));

export default router;
