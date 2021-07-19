require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const port = 9999;

const employeeController = require('./controllers/employeeController');

var app = express();

//CONF BODY-PARSER
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//CONF ENGINE
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


app.get('/', (request, response) => {
    response.render('employee/index');
})

app.get('/employee/logout', (request, response) => {
    response.render('employee/logout')
})

app.listen(9999, () => {
    console.log('Servidor conectado com sucesso na porta: ' +port);
});

app.use('/employee', employeeController);


