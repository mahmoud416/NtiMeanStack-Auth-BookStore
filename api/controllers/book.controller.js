import Book from "../models/Book.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getBooks = async (req, res, next) => {
    try {
        const title = req.query.title;
        const query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        const books = await Book.find(query);
        return next(CreateSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}

export const addBook = async (req, res, next) => {
    try {
        let imageValue = '';
        if (req.file && req.file.filename) {
            imageValue = `/uploads/${req.file.filename}`;
        } else if (req.body.image) {
            imageValue = req.body.image;
        }
        const newBook = new Book({
            title: req.body.title,
            isbn13: req.body.isbn13,
            price: req.body.price,
            image: imageValue,
            url: req.body.url
        });
        await newBook.save();
        return next(CreateSuccess(201, "Book Added", newBook));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        return next(CreateSuccess(200, "Book Deleted"));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}