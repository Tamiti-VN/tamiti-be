import express from 'express';
import {
  deleteUser,
  logOut,
  login,
  register,
  updateUser,
  userList,
} from '../../controllers/v1/user.controller.js';
import {
  isAllowedRoleMiddleware,
  authMiddleware,
  verifyToken,
} from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/register', register);

authRoutes.use(verifyToken);
authRoutes.post('/logout', logOut);
authRoutes.patch('/user/:id', updateUser);
authRoutes.get('/users', isAllowedRoleMiddleware('admin'), userList);
authRoutes.delete('/user/:id', isAllowedRoleMiddleware('admin'), deleteUser);
export { authRoutes };
