//Arquivo que será nosso banco de dados 

//Importando file System 
import fs from 'node:fs/promises';

//Definindo caminho do arquivo de banco
const DATABASE_PATH = new URL('db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(DATABASE_PATH, 'utf8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(async () => {
            await this.#persist();
        })

    }


    // Metodo que ira escrever nosso Banco de Dados em um arquivo fisico 
    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
    }


    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key,value]) => {
                    return row[key].includes(value);
                })
            })
        }

        return data;
    };

    insert(table, data) {
        //Verificar se já existe algo na tabela 
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();

        return data;
    };

    delete(table, id) {
        //Verifica se nas tabelas existe um id correspondente ao selecionado 
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist();
        }
    }

}