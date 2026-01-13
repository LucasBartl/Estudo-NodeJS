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
import { middelewares } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './Utils/extractQueryParams.js';


const server = http.createServer(async(request, response)=>{
    const {method, url} = request;
    
    //Envio do request e response aos middelewares
    await middelewares(request, response);


    //Vai ver se a requisiçao que sera feita pelo server bate com alguma rota criada em routes
    const route = routes.find(route =>{
        return route.method === method && route.path.test(url);
    })

    //Se achar uma rota passa os dados 
    if(route){
        const routeParams = request.url.match(route.path);

        const {query, ...params} = routeParams.groups

        request.params = params;
        request.query = query ? extractQueryParams(query) : {};

        return route.handler(request, response);
    }

    return response
    .writeHead(404)
    .end("Rota não encontrada");
});

//Definindo porta que o servidor ira utilizar 
server.listen(3333);