import { randomUUID } from 'node:crypto';
import { buildPath } from './utils/regex.js';
import { tasksCsv } from './utils/readercsv.js';
import { error } from 'node:console';

const task = []

function getData() {
    const date = new Date()
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

export const routes = [{
        method: 'GET',
        handler: (req, res) => {
            return res
                .end(JSON.stringify(task))
        }
    },

    {
        method: 'POST',
        handler: async (req, res) => {

            if (tasksCsv) {
                task.push(...tasksCsv.map(([title, description, completed_at, created_at, updated_at]) => ({
                    id: randomUUID(),
                    title:title || console.error("Sem titulo"),
                    description: description || console.error("Sem descrição"),
                    completed_at: completed_at || null,
                    created_at: created_at || getData(),
                    updated_at: updated_at || null,
                })))
            }
            
            while (tasksCsv.length > 0) tasksCsv.pop() 

            const { title, description, completed_at, updated_at } = req.body
            task.push({
                id: randomUUID(),
                title,
                description,
                completed_at,
                created_at: `${getData()}`,
                updated_at
            })
            
            return res
                .writeHead(201)
                .end(JSON.stringify(task))
        }
    },

    {
        method: 'DELETE',
        handler: (req, res) => {
            console.log(req.url);

            const indexTask = task.findIndex(index => index.id == buildPath(req.url)[1])
            if (indexTask > -1) {
                task.splice(indexTask, 1)
            } else {
                return res.end("Usuário não encontrado")
            }

            return res
                .end('Usuário Deletado!')
        }
    },

    {
        method: 'PUT',
        handler: (req, res) => {
            const indexTask = task.findIndex(index => index.id == buildPath(req.url)[1])
            const {
                title,
                description
            } = req.body

            if (indexTask > -1) {
                task[indexTask].title = title;
                task[indexTask].description = description;
                task[indexTask].updated_at = `${getData()}`
            }

            return res
                .end(JSON.stringify(task[indexTask]))
        }
    },

    {
        method: 'PATCH',
        handler: (req, res) => {
            const indexTask = task.findIndex(index => index.id == buildPath(req.url)[1])
            let paramUrl = buildPath(req.url)[3]

            if (Object.keys(req.body) != paramUrl) {
                return res.end("O atributo no Body não pode ser diferente da Url!")
            }

            if (indexTask > -1) {
                if (paramUrl == 'id' || paramUrl == 'created_at') {
                    return false, res.end("O atributo Id e o Created_at não podem ser alterados!")
                } else if (paramUrl == 'completed_at') {
                    return task[indexTask][`${paramUrl}`] = getData(), res.end(`Atributo ${paramUrl} alterado!`)
                }

                task[indexTask][`${paramUrl}`] = req.body[`${paramUrl}`]

                return task[indexTask]['updated_at'] = getData(), res.end(`Atributo ${paramUrl} alterado!`)
            } else {
                res.end("Id não encontrado ou paramêtro inválido")
            }
        }
    }

]

/*
    [
    {
        "id": NÃO TEM COMO MUDAR,
        "title": "Segunda tarefa",
        "description": "tarefa secundária",
        "completed_at": data-de-completude,
        "created_at": "26-6-2024",
        "updated_at": data-de-hoje
    }
]
*/