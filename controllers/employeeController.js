const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", { 
        viewTitle: "Cadastrar Empregado"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.salary = req.body.salary;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Cadastrar Empregado",
                    employee: req.body
                });
            }
            else
                console.log('Erro ao adicionar dados do empregado : ' +err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Editar Dados',
                    employee: req.body
                });
            }
            else
                console.log('Erro ao atualizar dados : ' +err);
        }
    });
}


router.get('/exibirInformacoes/:id', (req,res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/exibirInformacoes", {
                viewTitle: "Exibição dos Dados",
                employee: doc
            });
        }
    });
});

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Ocorreu um erro ao mostrar dados do usuário:' +err);
        }

    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Editar Dados/Atualizar",
                employee: doc
            });
        }
    }); 
});

router.get('/employee/logout', (req,res) => {
    res.render("employee/logout")
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Erro ao deletar funcionário :' +err); }
    });
});


module.exports = router;