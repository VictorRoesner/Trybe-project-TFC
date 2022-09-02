import { Router } from 'express';
import matchController from '../controllers/matchController';

const router = Router();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', (req, res) => matchController.create(req, res));

export default router;
