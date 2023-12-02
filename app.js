const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const publicRouter = require('./routes/public');
const app = express();

app.use(express.urlencoded({extended:true}));


app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/', publicRouter);
app.use(bodyParser.json());

const PORT  = process.env.PORT || 3200
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))


module.exports = app;