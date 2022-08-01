const express = require("express");
const notes = require('./Develop/db/db.json');

const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;


app.use(express.static('./Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes",(req,res) => {
    res.json(notes);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });