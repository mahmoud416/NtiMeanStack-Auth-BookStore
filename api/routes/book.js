import express from 'express';
import { getBooks, addBook, deleteBook } from '../controllers/book.controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get("/", getBooks);
router.post("/", upload.single('image'), addBook);
router.delete("/:id", deleteBook);

export default router;
