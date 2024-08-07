import { routes } from "../route.js"

export async function json (req, res){
    const buffers = []
    const { method } = req

    for await (const chunk of req){
        buffers.push(chunk)
    }
    
    if (method == 'POST' || method == 'PUT') {
        try{
            req.body = JSON.parse(Buffer.concat(buffers).toString())
        } catch{
            throw new Error('Lembre! O body não pode estar vazio.')
        }   
    }

    res.setHeader('Content-type', 'application/json')
}