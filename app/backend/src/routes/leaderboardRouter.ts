import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', (req, res) => leaderboardController.getHome(req, res));
router.get('/away', (req, res) => leaderboardController.getAway(req, res));

export default router;
