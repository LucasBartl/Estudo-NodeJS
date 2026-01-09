/*
--------------- Tipos de importação -------------------
ComomJS = Padrão de importação usando require
ESModules = import/export

//Importando modulo de http usando ComomJS
//const http = require('http');
*/

/*  ----------Tipos de armazenamento -------------

Stateful: Informações que são armazenadas na memoria 
Stateless: Informações que são salvas em outros arquivos
 */

/*  -----------Https status code -----------------

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
    
São número que expressão informações ao frontend.

    De 100 a 199 - São informativos 
    De 200 a 299 - São de sucesso 
    De 300 a 399 - São de redirecionamento 
    De 400 a 499 - São de erros e mal funcionamento
    De 500 a 599 - São de erros de servidor e serviços 

*/
import http from 'node:http'

const users = [];

const server = http.createServer((request, response)=>{
    const {method, url} = request;
    //Identificando rotas e respostas por metodo utilizado
    if(method === "GET" && url === "/users"){
        //Não podemos devolver arrays, temos que conveter para JSON
       return response
       .setHeader("Content-type","application/json")//Cabeçalho enviado para o front saber que se trata de Json
       .end(JSON.stringify(users));
    }
    if(method === "POST" && url === "/users"){
        users.push({
            "id":1,
            "name": "pedro",
            "email":"pedro@gmail"
        });


        return response
        .writeHead(201)
        .end();
    }

    return response
    .writeHead(404)
    .end("Rota não encontrada");
});

//Definindo porta que ira utilizar 
server.listen(3333);