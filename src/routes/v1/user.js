import express from 'express';
import {
  deleteUser,
  logOut,
  login,
  register,
  updateUser,
  userList,
} from '../../controllers/v1/user.controller.js';
import { isAllowedRoleMiddleware, authMiddleware } from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get('/users', authMiddleware, userList);

// authRoutes.use(authMiddleware);
authRoutes.post('/logout', authMiddleware, logOut);
authRoutes.patch('/user/:id', authMiddleware, updateUser);
authRoutes.delete('/user/:id', authMiddleware, isAllowedRoleMiddleware('admin'), deleteUser);
export { authRoutes };
