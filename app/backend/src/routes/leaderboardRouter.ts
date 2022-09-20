import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', (req, res) => leaderboardController.getHome(req, res));

export default router;
