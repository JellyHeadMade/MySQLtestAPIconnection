const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host    : '127.0.0.1',
    user    : 'root',
    password: 'Blueberryfigbar!!7',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql connected');
}) 

const app = express();

// Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        res.send('database created ...')
    });
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    })
}) 

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post number one'}
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 was inserted, see ' + result);
    })
})

app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body: 'This is post number Two and the last one'}
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 was inserted, see ' + result);
    })
})

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched..');
    })
})

// Select individual post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched..');
    })
})

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated..');
    })
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted..');
    })
})

app.listen('9000', () => {
    console.log('Server started on port 9000');
});