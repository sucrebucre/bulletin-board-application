// require npm packages
const bodyparser = require('body-parser');
const express = require('express');
const { Pool } = require('pg');

// start node express
const app = express();

// set view enging to "ejs"
app.set('view engine', 'ejs');

// type in terminal: createdb -h localhost -p 5432 -U postgres bulletinboard
const pool = new Pool({
   host: 'localhost',
   user: 'postgres',
   database: 'bulletinboard',
   port: '5432',
 })

 // bodyparser (for POST requests)
 let urlencodedParser = bodyparser.urlencoded({ extended: true })

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
app.post('/messages', urlencodedParser, function (request, response) {

    let new_content = request.body;

    pool.connect()

    let title_input = new_content["title"];
    let body_input = new_content["body"];

    pool.query('INSERT INTO messages (title, body) VALUES ($1, $2)', [title_input, body_input], (err) => {
      //console.log(err ? err.stack : 'New input added to the database')
    pool.query('SELECT * FROM messages', (err, res) => {
      //console.log(err ? err.stack : res.rows)
    posts = res.rows;

    response.render('posts');

    // get request referring to file in view folder
    app.get('/messages', function (request, response) {
      response.render({posts});
      //console.log(posts);
    });


    console.log(posts);

    //pool.end()
    })
  })



    //response.render('posts');

});

// issues to be fixed:
// 1 the script can only run multiple times if "pool.end()" is turned off
// 2 if localhost:3000/messages is visited directly, without populating it first, it does not load the results


// set the port on localhost
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
