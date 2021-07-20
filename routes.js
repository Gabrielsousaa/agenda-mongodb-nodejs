const express = require('express');
const route = express.Router();

//Importanto controladores
const homeController = require('./src/controllers/homeController');
const LoginController = require('./src/controllers/LoginController');
const ContatoController = require('./src/controllers/ContatoController');
//require para os contatos da sessao do cliente
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/index', LoginController.index);
route.post('/login/register', LoginController.register);
route.post('/login/login', LoginController.login);
route.get('/login/logout', LoginController.logout);

//rotas de contato
route.get('/contato/index', loginRequired, ContatoController.index);
route.post('/contato/register', loginRequired, ContatoController.register);
route.get('/contato/index/:id', loginRequired, ContatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, ContatoController.edit);
route.get('/contato/delete/:id', loginRequired, ContatoController.delete);

module.exports = route;