const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Esse campo é obrigatório'
    },
    email: {
        type: String,
        required: 'Esse campo é obrigatório'
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    salary: {
        type: String,
        required: ''
    }
});

//Verificação no formato do email

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Formato de email inválido');

mongoose.model('Employee', employeeSchema);