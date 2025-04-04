/*
An express server that serves static files from the build directory and also handles the API routes.
The server is started with the command node index.js.
*/
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    }
    else {
        response.statusMessage = `Note with id ${id} not found`
        response.status(404).end()
    }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => Number(note.id)))
    : 0

  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  // console.log(request.body)
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const newNote = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }

  notes = notes.concat(newNote)

  response.json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
