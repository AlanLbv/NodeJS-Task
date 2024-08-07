import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
          .then(data =>{
            this.#database = JSON.parse(data)
        })
          .catch(() => {
            this.#persist()
        })
    }

    #persist() { //Método persist salva nosso banco de dados
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }

    //Retorna os dados da "tabela"
    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })})
            }
        return data
    }

    //insere dados na "tabela"
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {  //TA COM PROBLEMA ESSA LINHA, NÃO DA PARA DAR PUT E POST!
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist()
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}