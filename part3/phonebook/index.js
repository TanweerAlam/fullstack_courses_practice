// console.log('Hello World!')

const http = require('http')

const server = http.createServer(( request, response ) => {
    response.writeHead(200, { 'Content-Type' : 'text/plain'})
    response.end('Hello World!!!')
})

const PORT = 3003
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
