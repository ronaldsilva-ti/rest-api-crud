const express = require('express');
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//use routes
app.use(require('./routes/index'));




const PORT = 4000;

app.listen(PORT,() => {
    console.log('SERVER RUNNING IN PORT ' + PORT)
})