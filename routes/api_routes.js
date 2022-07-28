const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const uuid = require('uuid').v4
const mysql = require('mysql2')
const db_path = path.join(__dirname, '../db/db.json')

// const connection = mysql.createPool({
//     host: 'localhost',
//     database: 'notes_server',
//     user: 'root',
//     password: '4321'
// })

// router.get('/notes', (req, res) => {
//     connection.query('SELECT * FROM notes', (err, data) => {
//         if (err) return console.log(err);
    
//         res.json(data);
//     })
// })
// //create todos
// router.post('/notes', (req, res) => {
//     connection.query(`INSERT INTO notes SET ?`, req.body, (err, data) => {
//         if (err) return console.log(err);
    
//         res.json({
//             message: 'added note'
//         });
//     })
// })

// router.delete('/notes', (req, res) => {
//     connection.query(`DROP FROM notes WHERE ${data-note.id} === id`)
// })

function getNotesData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data))
}
//get notes
router.get('/notes', (req, res) => {
    getNotesData()
        .then(note_data => {
            res.json(note_data);
        })
        .catch(err => console.log(err))
})
//create notes
router.post('/notes', (req, res) => {
    getNotesData()
        .then(note_data => {
            const new_notes = req.body

            new_notes.id = uuid().slice(0, 4)

            note_data.push(new_notes)

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => res.json(note_data))
                .catch(err => console.log(err))
    })
})
//delete notes
router.delete('/notes/:id', (req, res) => {
    getNotesData()
        .then(notes => {
            const id = req.params.id
            const obj = notes.find(note => note.id === id)
            const index = notes.indexOf(obj)

            notes.splice(index, 1)

            fs.promises.writeFile(db_path, JSON.stringify(notes, null, 2))
                .then(() => res.json(notes))
                .catch(err => console.log(err))
        })
})

module.exports = router