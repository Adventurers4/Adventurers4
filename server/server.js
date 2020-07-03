var express = require('express');
var session = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'MyNotes',
    port: 3001

});

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

/* session.id = results[0].id
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    id : 0
}));
 */

var obj={id:0}


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    // id: 0
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/', function (request, response) {
//   response.sendFile(path.join(__dirname + '/login.html'));
// });
// var hash;
// app.post('/login', function (request, response) {
//     console.log("inside post login server")
//     var email = request.body.email;
//     var password = request.body.password;
//     connection.query('SELECT * FROM USERS WHERE email = ? AND password = ?', [email], function (error, results, fields) {

//             // if (results.length > 0) {
//                 if (bcrypt.compareSync(password, results[0].password)) {
//                 request.session.loggedin = true;
//                 request.session.name = results[0].name;
//                 obj.id = results[0].id
                
//                 response.send('correct Username and/or Password!'); 
//             } else {
//                 response.send('Incorrect Username and/or Password!');
//             }
//             response.end();
//         });
//     // else {
//     //     response.send('Please enter Username and Password!');
//     //     response.end();
//     // }
// });
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
    // });
});

// app.post('/addNotes', function (req, res) {
//     var text = req.body.text
//     var date = req.body.date
//     var sql = "INSERT INTO NOTES (text, date) VALUES ?"
//     var values = [text, date]
//     connection.query(sql, [values], function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });
// app.get('/Note', function (request, response) {
//     if (request.session.loggedin) {
//         response.send('Welcome back, ' + request.session.name + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });
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
            //  res.send('Welcome back, ' + request.session.name + '!');

        }
    });
});
app.post('/delNotes', function (req, res) {
    var id = req.body.id
  
    // DELETE statment
    var sql = 'DELETE  FROM NOTES WHERE id = ?';
// var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    // delete a row with id 1
    connection.query(sql, id, (error, results, fields) => {
        if (error)
            return console.error(error.message);
        if (results.affectedRows>0){
        console.log('Deleted Row(s):', results.affectedRows);}
        else{return 0;}
        
    });
});

app.post('/upNotes', function (req, res) {

    
       var text= req.body.text
        var date = req.body.date
       var id=req.body.id
    
    var sql = "UPDATE NOTES set text =? , date =?  WHERE id = ?";
var note=[text,date,id]
    // var sql = `UPDATE NOTES
    //        SET text = ?
    //        WHERE id = ?`;
    // var sql = `UPDATE NOTES SET text = ? WHERE id = ?`;
    

    // execute the UPDATE statement
    connection.query(sql,note, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        // console.log('Rows affected:', results.affectedRows);
        res.send('updated');

    });
});

 app.get('/selectNotes', function (req, res) {
     var idu=obj.id
     var sql = 'SELECT * FROM NOTES where idu=?'
    //  var sql = 'SELECT id, text, Date_FORMAT(date, "%d%m%Y") FROM NOTES where idu=?'

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
            // res.send(data) 
         }
     });   
 });



app.post('/App',function(req,res){
    // var name = req.body.name
console.log("posted from App rout")   
//  res.end(obj.id)
    console.log(obj.id)
})

app.post('/logout', (request, response) => {
obj.id=0
    console.log('Destroying session');
    request.session.destroy();
    response.send({ result: 'OK', message: 'Session destroyed' });
    
});

app.listen(5000, function () {
    console.log('listening on port 3000!');
});