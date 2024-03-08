//imports : 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT;


//database connection
mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on('error', (e) => console.log(e));

//if db connected : 
db.once('open', () => console.log('connected to db'));


//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//set template engine
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

//routes : 
app.use("", require('./routes/routes'));

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})