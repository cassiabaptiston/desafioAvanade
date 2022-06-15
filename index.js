const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

var funcionarios = [];

function getProfessor(req, res) {
    res.send(funcionarios);
}

function cadastroProfessores(req, res) {
    const professor = req.body;
    const professorPesquisado = funcionarios.find((professorNaLista) => professorNaLista.name == professor.name);
    if (!professorPesquisado) {
        funcionarios.push(professor);
        res.send('Inserido com Sucesso');
    } else {
        res.send(`não é possível inserir pois já existe um Professor com nome ${professor.name}`);
    }
}

function getProfessorById(req, res) {
    const nomeProfessor = req.params.id;
    const professorPesquisado = funcionarios.find((professorNaLista) => professorNaLista.name == nomeProfessor);
    if(!professorPesquisado){
        res.send(`não existe um professor com este nome ${nomeProfessor}`)
    } else {
        res.send(professorPesquisado);
    }
}

function deleteProfessor(req, res) {
    const nomeProfessor = req.params.id;
    funcionarios = funcionarios.filter((professor) => professor.name != nomeProfessor);
    res.send(`O produto com o nome ${nomeProfessor} foi removido com sucesso!`);
}

function updateProfessor(req, res) {
    const nomeProfessor = req.params.id;
    const professor = req.body;
    const professorPesquisado = funcionarios.find((professorNaLista) => professorNaLista.name == nomeProfessor);
    if(!professorPesquisado){
        res.send(`não existe o professor com o nome ${nomeProfessor} cadastrado`)
    } else {
        professorPesquisado.name = professor.name;
        professorPesquisado.curso = professor.curso;


        
        res.send(`Professor com o nome ${nomeProfessor} alterado com sucesso!`);
    }
}


app.get('/professor', getProfessor);
app.get('/professor/:id', getProfessorById);
app.post('/professor', cadastroProfessores);
app.put('/professor/:id', updateProfessor);
app.delete('/professor/:id', deleteProfessor);

app.listen(3000);