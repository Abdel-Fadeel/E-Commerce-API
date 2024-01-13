import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authenticationMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/', authorizePermissions('admin'), getAllUsers);
router.get('/showMe', showCurrentUser);
router.patch('/updateUser', updateUser);
router.patch('/updateUserPassword', updateUserPassword);
router.get('/:id', getSingleUser);

export default router;
