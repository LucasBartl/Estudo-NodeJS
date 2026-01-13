//Arquivo responsavel por gerenciar nossas rotas HTTP

//Importando o gerador de id
import { randomUUID } from 'node:crypto';
//Importando banco de dados
import { Database } from './database.js';
import { buildPath } from './Utils/build.js';


const database = new Database(); 

export const routes = [

    {
        method: "GET",
        path: buildPath("/users"),
        handler: (request, response) => {

            const { search} = request.query

            //Busca dos usuários da tabela dentro do banco 
            const users = database.select("users",{
                name:search,
                email:search
            });

            //Não podemos devolver arrays, temos que conveter para JSON
            return response.end(JSON.stringify(users));
        }
    },
    {
        method: "POST",
        path: buildPath("/users"),
        handler: (request, response) => {
            //Pegando de dentro de body as propriedades definidas
            const { name, email } = request.body;
            //Criamos uma const com os dados que serão enviados(Os dados vem da response)   
            const user = ({
                "id": randomUUID(),
                name,
                email
            });
            //Adicionamos a const criada dentro da tabela "Users"
            database.insert("users", user);
            return response
                .writeHead(201)
                .end();
        }

    },
    { 
        method: "DELETE",
        path: buildPath("/users/:id"),
        handler: (request, response) => {

            const {id} = request.params
            database.delete("users", id);
            return response.end("Deletado");
        }

    },    
    { 
        method: "PUT",
        path: buildPath("/users/:id"),
        handler: (request, response) => {
            
            const {id} = request.params;
            const {name, email } = request.body;    

            //Reconhece o id conhecido e atualiza os parametros
            database.update("users", id, {
                name, 
                email
            })


            return response.end("Dados atualizados");
        }

    }
    
]