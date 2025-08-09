import express from 'express';
import { getAllUsers, getById, deleteUser, addUser } from '../controllers/user.controller.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();
///get all
router.get('/', verifyAdmin, getAllUsers );

// Add user (admin only)
router.post('/', verifyAdmin, addUser);

// Delete user (admin only)
router.delete('/:id', verifyAdmin, deleteUser);

//get by id
router.get('/:id', verifyUser, getById);

export default router;