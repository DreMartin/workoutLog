let express = require('express');
let app = express();
var bodyParser = require('body-parser');


app.use(require('./middleware/headers'));

app.use('/api/test', function (req, res) {
    res.send("Anything you want, you got it!!");
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize('Workoutlog', 'postgres', 'pgDB@1150', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('connected to workoutlog postgres db');
    },
    function (err) {
        console.log(err);
    }
);


app.listen(3000, function () {
    console.log("app is listening on 3000");
});

// build a user model in sqllize
var User = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
});

User.sync();

app.use(bodyParser.json());

app.post('/api/user', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;
    User.create({
        username: username,
        passwordhash: ""
    }).then(
        //Sequelize is going to return the object it created from db.

        function createSuccess(user) {
            res.json({
                user: user,
                message: 'create'
            });

        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});


//Need to create a user object and use sequelize to put that user into
//our database.


// =============================================
// *********************************************
// DANGER THIS WILL DROP (DELETE) THE USER TABLE
// User.sync({ force: true });
// *********************************************
// =============================================