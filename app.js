// load environment variables
require('dotenv').config();

// require npm packages
const bodyparser = require('body-parser');
const express = require('express');
const { Pool } = require('pg');

// start node express
const app = express();

// set view enging to "ejs"
app.set('view engine', 'ejs');

// setting up the connection with the database using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

// bodyparser (for POST requests)
let urlencodedParser = bodyparser.urlencoded({ extended: true });

// code to create a table within the database

// CREATE TABLE messages (
//   id              SERIAL PRIMARY KEY,
//   title           TEXT NOT NULL,
//   body            TEXT NOT NULL
// );


// get input through CLI

// pool.connect()
//
// pool.query('INSERT INTO messages (title, body) values($1, $2)', process.argv.splice(2), (err) => {
//   console.log(err ? err.stack : 'terminal message added to the database')
// pool.query('SELECT * FROM messages', (err, res) => {
// 	 console.log(err ? err.stack : res.rows)
// 	pool.end()
// 	})
// })


// check if connection with postgres database is established

// pool.connect(function(err, client, done) {
//   if(err) {
//     return console.error('connexion error', err);
//   }
//   client.query('SELECT $1::int AS number', ['1'], function(err, result) {
//     done();
//
//     if(err) {
//       return console.error('error running query', err);
//     }
//
//     console.log(result.rows[0].number);
//
//   });
// });

// get request referring to file in view folder
app.get('/add-message', function (request, response) {
  response.render('add-message');
});

// get input through POST form
app.post('/post-message', urlencodedParser, function (request, response) {

    let new_content = request.body;

    pool.connect()

    let title_input = new_content["title"];
    let body_input = new_content["body"];

    pool.query('INSERT INTO messages (title, body) VALUES ($1, $2)', [title_input, body_input], (err) => {
      response.redirect('/messages');
    })

    //pool.end()

});


// get request referring to file in view folder
app.get('/messages', function (request, response) {

    pool.connect()

    pool.query('SELECT * FROM messages', (err, res) => {

    posts = res.rows;

    response.render('posts', {posts});

    //pool.end()

    })
});

// set the port on localhost
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
