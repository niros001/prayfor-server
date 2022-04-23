const express = require('express');
// const mongoose = require('mongoose');
const herokuAwake = require('heroku-awake');
const path = require('path')
require('dotenv').config()
const app = express()
const authRoutes = require('./routes/auth')

// const dbURI = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@cluster0.uvbmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.static('build'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use('/api/auth', authRoutes)
app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')))
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
// const db = mongoose.connection

// db.on("error", (err)=>{console.error(err)})
// db.once("open", () => {console.log("DB started successfully")})

app.listen(process.env.PORT || 2400, () => {
  console.log("Server started: 2400");
  herokuAwake('https://pray-for.herokuapp.com');
})
