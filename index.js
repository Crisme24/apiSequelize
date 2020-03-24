const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');
const transactionRouter = require('./routes/transactions');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/transactions', transactionRouter);


app.listen(PORT, () => console.log('Server running on ' + PORT));