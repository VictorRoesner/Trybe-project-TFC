import { Router } from 'express';
import matchController from '../controllers/matchController';

const router = Router();

router.get('/', (req, res) => matchController.getAll(req, res));
// router.get('/:id', (req, res) => matchController.getById(req, res));

export default router;
