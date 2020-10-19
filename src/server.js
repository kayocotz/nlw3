//importar dependencias
const express = require('express');
const path = require('path');
const pages = require('./pages.js');
//iniciando o pacote express
const server = express()
server
//utilizar body da requisicao
.use(express.urlencoded({extended: true}))
//utilizando os arquivos estáticos
.use(express.static('public'))

//configurar template engine
.set('views', path.join(__dirname,"views"))
.set('view engine', 'hbs')
//rotas da aplicação
.get('/', pages.index)
.get('/orfanato', pages.orfanato)
.get('/orfanatos', pages.orfanatos)
.get('/create-orfanato', pages.createOrfanato)
.post('/save-orfanato', pages.saveOrfanato)

//ligar o servidor
server.listen(5500)