var express = require('express');
var session = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var mysql = require('mysql');

//connect to the db
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'MyNotes',
    // port: 3001

});

//create the schema
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    connection.query("CREATE DATABASE IF NOT EXISTS myNotes", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    var users = "CREATE TABLE IF NOT EXISTS USERS (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(30),password VARCHAR(100),email VARCHAR(50) UNIQUE)";
    connection.query(users, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var notes = "CREATE TABLE IF NOT EXISTS NOTES (id INT AUTO_INCREMENT PRIMARY KEY,text VARCHAR(1000),date DATETIME,idu INT,FOREIGN KEY(idu) REFERENCES USERS(id))";
    connection.query(notes, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

});


var obj={id:0}


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// login
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ?', [email],
            (error, results, fields) => {
                // if (results.length > 0) {
                 if (bcrypt.compareSync(password, results[0].password)) {
                    req.session.loggedin = true;
                     req.session.name = results[0].name;
                    obj.id = results[0].id
                    // res.redirect('/Note');
                    res.send("Successful");
                    // res.redirect('/Note');

                } else {
                    res.send('Incorrect Email and/or Password!');
                }
                res.end();
            });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});






//regester
app.post('/register', function (req, res) {
    var today = new Date();
    
   var name = req.body.name
   var password = req.body.password
    var email = req.body.email
    
     var hash = bcrypt.hashSync(password, 10);

 

    var values = { name: name, password: hash,email:email}
    
    // console.log(hash)
    console.log(values)
        connection.query('INSERT INTO users SET ?',values, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
   
});

//add notes
app.post('/Note', function (req, res) {
    var note = {
        text: req.body.text,
        date: req.body.date,
        idu:obj.id
    }
    connection.query('INSERT INTO notes SET ?', note, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'add note sucessfully'
            })
        }
    });
});

//delete notes
app.post('/delNotes', function (req, res) {
    var id = req.body.id
  
    // DELETE statment
    var sql = 'DELETE  FROM NOTES WHERE id = ?';
    connection.query(sql, id, (error, results, fields) => {
        if (error)
            return console.error(error.message);
        if (results.affectedRows>0){
        console.log('Deleted Row(s):', results.affectedRows);}
        else{return 0;}
        
    });
});

//update note
app.post('/upNotes', function (req, res) {
    var text= req.body.text
    var date = req.body.date
    var id=req.body.id
    
    var sql = "UPDATE NOTES set text =? , date =?  WHERE id = ?";
	var note=[text,date,id]
    connection.query(sql,note, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send('updated');
    });
});

//get all the notes
 app.get('/selectNotes', function (req, res) {
     var idu=obj.id
     var sql = 'SELECT * FROM NOTES where idu=?'
     connection.query(sql,idu, function (error, results, fields) {
         console.log(results)
         if (error) {
             res.json({
                 status: false,
                 message: 'there are some error with query'
             })
         } else {
             res.send({
                 status: true,
                 data: results,
                 message: 'select all notes sucessfully'
             })
         }
     });   
 });


//use it for the redirect in the front end 
app.post('/App',function(req,res){
console.log("posted from App rout")   
//  res.end(obj.id)
    console.log(obj.id)
})


//logout
app.post('/logout', (request, response) => {
obj.id=0
    console.log('Destroying session');
    request.session.destroy();
    response.send({ result: 'OK', message: 'Session destroyed' });
    
});

app.listen(5000, function () {
    console.log('listening on port 5000!');
});