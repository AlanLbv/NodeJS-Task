export async function json (req, res) {
    const buffers = []  
    const { method } = req
   
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    res.setHeader('Content-type', 'application/json')

    if ('POST' == method || 'PUT' == method || 'PATCH' == method) {
       try {
            req.body = JSON.parse(Buffer.concat(buffers).toString().toLowerCase())
       } catch{
            throw new Error("O body não pode estar vazio")
       }           
    }
}