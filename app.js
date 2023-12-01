var express = require('express');
var path = require('path');


var publicRouter = require('./routes/public');
var app = express();

app.use(express.urlencoded({extended:true}));


app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/', publicRouter);


const PORT  = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))


module.exports = app;