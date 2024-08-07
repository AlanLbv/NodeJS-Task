import http from 'node:http';
import { json } from './middleware/json.js';
import { routes } from './route.js';


const server = http.createServer(async (req, res) =>{
    await json(req, res)
    const { method, url } = req

    const route = routes.find(rota => {
        return rota.method == method
    })

    if (route) {
        return route.handler(req, res), req.url
    }

    return res
        .writeHead(404)
        .end('Not Found!')
})

server.listen(3333)

/*
    {
        id: 65452348645
        title: "TAREFA"
        description: "tarefinha"
        completed_at: null
        created_at: 01/01/00
        updated_at: null
    }
*/