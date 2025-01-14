require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path');

const main = async () => {
    // Create app
    const app = express();

    // For all the POST form
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));

    // Define the view engine
    app.set('views', path.join(__dirname, 'app', 'views')); // Par défaut, EJS cherche un dossier 'views' à la racine et nous l'avons placé dans un dossier 'app'
    app.set('view engine', 'ejs');

    // Connect the DB
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);

    // Require all the routing
    const bookRouters = require('./app/routes/books');
    const categoryRouters = require('./app/routes/categories');
    bookRouters(app);
    categoryRouters(app);

    // Define default route
    app.get('/errors', (req, res, next) => {
        return res.render('errors');
    });

    app.use((req, res, next) => {
        return res.redirect('/books');
    });

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
}

main()