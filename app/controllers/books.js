const Book = require('../models/book');
const Category = require('../models/category');
const path = require('path');

/**
 * Method used for retrieve all the books
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const { category } = req.query; // Récupérer la catégorie du paramètre de la requête

        let books;
        let selectedCategory = category || null;

        if(selectedCategory) {
            books = await Book.find({ category: selectedCategory }).populate('category').sort('title');
        } else {
            books = await Book.find().populate('category').sort('title');
        }

        const categories = await Category.find();
        res.render('books/index', { books, categories, selectedCategory });
    } catch (error) {
        console.error(error);
        return res.redirect('/errors');
    }
};

/**
 * Method used to retrieve a book by his id
 * @param req
 * @param res
 * @param next
 */
exports.getById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('category');

        if (!book) {
            console.error('Book not found');
            return res.redirect('/errors');
        }

        return res.render('books/single', { book });
    } catch(e) {
        console.error(e);
        return res.redirect('/errors');
    }
};

/**
 * Method used to add a new book or show the new page
 * @param req
 * @param res
 * @param next
 */
exports.new = async (req, res, next) => {
    if(req.method === 'POST') {
        try {
            const book = new  Book({
                ...req.body, // destructuring the body of the request { title: '...', author: '...', ... }
                status: req.body.status === "on",
                category: req.body.category
            });

            await Category.findByIdAndUpdate(
                req.body.category, // ID de la catégorie
                { $push: { books: book._id } }, // Ajouter l'ID du livre au tableau 'books'
            );

            await book.save();

            return res.redirect('/books');
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    } else {
        try {
            const categories = await Category.find();

            return res.render('books/new', { categories });
        } catch (e) {
            console.error(e);
            return res.redirect('/errors');
        }
    }
};

/**
 * Method used to update a book or retrieve the book to edit and display it
 * @param req
 * @param res
 * @param next
 */
exports.edit = async (req, res, next) => {
    if(req.method === 'POST') {
        try {
            const status = req.body.status === "on";
            const book = await Book.findById(req.params.id);


            if (!book) {
                console.error('Book not found');
                return res.redirect('/errors');
            }

            const oldCategoryId = book.category;
            let newCategoryId = req.body.category === '' ? null : req.body.category;

            if (oldCategoryId?.toString() !== newCategoryId?.toString()) {
                const oldCategory = await Category.findById(oldCategoryId);
                if (oldCategory) {
                    oldCategory.books.pull(book._id);
                    await oldCategory.save();
                }

                const newCategory = await Category.findById(newCategoryId);
                if (newCategory) {
                    newCategory.books.addToSet(book._id);
                    await newCategory.save();
                }
            }

            book.title = req.body.title;
            book.author = req.body.author;
            book.status = status;
            book.category = newCategoryId;

            await book.save();

            return res.redirect('/books');
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    } else {
        try {
            const book = await Book.findById(req.params.id);
            const categories = await Category.find();

            if (!book) {
                console.error('Book not found');
                return res.redirect('/errors');
            }

            if(!categories.length > 0) {
                console.error('No categories found');
                return res.redirect('/errors');
            }

            return res.render('books/edit', { book, categories });
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    }
};

/**
 * Method used to delete a book by his id
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        await Book.findByIdAndDelete(bookId);
        await Category.updateMany(
            { books: bookId }, // Trouver les catégories avec ce livre
            { $pull: { books: bookId } } // Retirer le livre supprimé
        );

        return res.redirect('/books');
    } catch(e) {
        console.error(e);
        return res.redirect('/errors');
    }
};

/**
 * Method used to toggle a status of a book by his id
 * @param req
 * @param res
 * @param next
 */
exports.toggleStatus = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            console.error('Book not found');
            return res.redirect('/errors');
        }

        book.status = !book.status;

        await book.save();

        return res.redirect('/books');
    } catch(e) {
        console.error(e);
        return res.redirect('/errors');
    }
};

