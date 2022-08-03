const express = require("express");
const notes = require('./Develop/db/db.json');

const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;


app.use(express.static('./Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})


app.get('/api/notes', (req, res) => {
    res.json(notes.notes);
})



app.post('/api/notes', (req, res) => {

    req.body.id = notes.notes.length.toString();
    
    if (!validateNote(req.body)){
        res.status(400).send('Your note is  not properly formatted');
    }else {
        const note = createNewNote(req.body, notes.notes)
        res.json(note);
    } 
});

// app.delete('/api/notes'), (req, res)=> {

// }

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
    return note;
}

function validateNote(note) {
if (!note.title || typeof note.title !== 'string') {
    return false;
}
if (!note.text || typeof note.text !== 'string') {
    return false;
}
return true;
}



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});