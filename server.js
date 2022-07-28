const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333
const path = require('path')

const api_routes = require('./routes/api_routes')
//share static/browser files
app.use(express.static(path.join(__dirname, 'public')))
//attach client side form data to request.body object
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//load routes
//localhost333/api
app.use('/api', api_routes)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})







// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/public/index.html');
// });

// app.get('/notes', (request, response) => {
//     response.sendFile(__dirname + '/public/notes.html');
// });
