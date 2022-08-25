import { Router } from 'express';
import UserController from '../controllers/userController';
// import UserService from '../services/userService';

// const userService = new UserService();
// const userController = new UserController(userService);

const router = Router();

router.post('/', (req, res) => UserController.login(req, res));

export default router;
