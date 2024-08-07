import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"
const database = new Database()

export const routes = 
[
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('users', search ? {
                name: search
            } : null)

            return res
                .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
            console.log(req.body)

        const user = {
            id: randomUUID(),
            name,
            email,
        };

        database.insert('users', user)

        return res
            .writeHead(201)
            .end(JSON.stringify(user))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) =>{
            const id = req.params.id
            const { name, email } = req.body

            database.update('users', id, {
                name, email
            })

            return res.writeHead(204).end("Usuário Alterado!")
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) =>{
            const id = req.params.id
            database.delete('users', id)

            return res.writeHead(204).end()
        }
    }
]