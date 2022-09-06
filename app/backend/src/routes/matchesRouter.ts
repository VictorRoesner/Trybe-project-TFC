import { Router } from 'express';
import matchController from '../controllers/matchController';

const router = Router();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.finish(req, res));
router.patch('/:id', (req, res) => matchController.update(req, res));
export default router;
