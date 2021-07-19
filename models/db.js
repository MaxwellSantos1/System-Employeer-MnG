const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmpregadoDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Sucesso ao conectar ao MongoDB') }
    else { console.log('Erro na conexão ao banco de dados : ' +err) }
});

require('./employee.model');