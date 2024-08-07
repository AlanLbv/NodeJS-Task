import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    //em alguns casos, não há como trabahlar com meio dado
    //{nome: Al} {senha: ***}

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent);

    return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334)