import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './route.js';
import { extractQueryParams } from './utils/extract-query-params.js';

//  Query Parameters: URL Stateful => filtros, paginação (não são dados sensíveis e não são obrigatórios)
//  Route Parameters: Identificação de Recurso (não precisa de um nome, o método subtende o que se espera)
//  Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Diego (filtra pelo usuário ID == 1 e o nome == Diego)
// DELETE http://localhost:3333/users/1 (através do método, se entende que eu quero deletar o usuário 1)
//

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups }

       const { query, ...params } = routeParams.groups

       req.params = params
       req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3334)