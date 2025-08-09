import fs from 'fs';
import Book from './models/Book.js';

const BookJson = JSON.parse(fs.readFileSync('./Bookstore.books.json', 'utf-8'));

export const seedBooksData = async () => {
    try {
        //connection to the database
        //query 
        await Book.deleteMany({});
        await Book.insertMany(BookJson);
        console.log("Data seeded successfully");

        //disconnect
    } catch (error) {
        console.log("Error: ", error);
    }
}