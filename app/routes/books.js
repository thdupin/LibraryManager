const express = require('express'),
    booksRoutes = express.Router(),
    BookController = require('../controllers/book');

module.exports = (app) => {
    booksRoutes.get('/books', BookController.getAll);

    booksRoutes.get('/books/new', BookController.new); // Affichage du formulaire
    booksRoutes.post('/books/create', BookController.new); // Traitement du formulaire

    booksRoutes.get('/books/:id', BookController.getById);
    booksRoutes.post('/books/:id/toggle-status', BookController.toggleStatus);
    booksRoutes.get('/books/:id/edit', BookController.edit);
    booksRoutes.post('/books/:id/update', BookController.edit);
    booksRoutes.post('/books/:id/delete', BookController.deleteById);

    app.use('/', booksRoutes);
};