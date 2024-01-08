import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/showMe', showCurrentUser);
router.post('/updateUser', updateUser);
router.post('/updateUserPassword', updateUserPassword);
router.route('/:id').get(getSingleUser).patch(updateUser);

export default router;
