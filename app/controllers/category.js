const Category = require('../models/category');
const Book = require('../models/book');

/**
 * Method used to retrieve all the categories
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find().populate('books').sort('name');

        res.render('categories/index', { categories });
    } catch (error) {
        console.error(error);
        return res.redirect('/errors');
    }
};

/**
 * Method used to retrieve a category by his id
 * @param req
 * @param res
 * @param next
 */
exports.getById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate('books');

        if (!category) {
            console.error('Category not found');
            return res.redirect('/errors');
        }

        return res.render('categories/single', { category, books: category.books });
    } catch(e) {
        console.error(e);
        return res.redirect('/errors');
    }
};

/**
 * Method used to add a new category or show the new page
 * @param req
 * @param res
 * @param next
 */
exports.new = async (req, res, next) => {
    if(req.method === 'POST') {
        try {
            const category = new  Category({
                ...req.body, // destructuring the body of the request { name: '...', description: '...', ... }
            });

            await category.save();

            return res.redirect('/categories');
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    } else {
        return res.render('categories/new');
    }
};

/**
 * Method used to update a category or retrieve the category to edit and display it
 * @param req
 * @param res
 * @param next
 */
exports.edit = async (req, res, next) => {
    if(req.method === 'POST') {
        try {
            // Update de la catégorie avec les nouvelles données
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    description: req.body.description,
                },
                { new: true }
            );

            if (!updatedCategory) {
                console.error('Category not found');
                return res.redirect('/errors');
            }

            return res.redirect('/categories');
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    } else {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                console.error('Category not found');
                return res.redirect('/errors');
            }

            return res.render('categories/edit', { category, path: '/categories/edit' });
        } catch(e) {
            console.error(e);
            return res.redirect('/errors');
        }
    }
};

/**
 * Method used to delete a category by his id
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        await Category.findByIdAndDelete(categoryId);

        await Book.updateMany(
            { category: categoryId },
            { $set: { category: null } }
        );

        return res.redirect('/categories');
    } catch(e) {
        console.error(e);
        return res.redirect('/errors');
    }
};