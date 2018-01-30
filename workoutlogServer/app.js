var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

User.sync(); // sync( {force: true}) WARNING: This will DROP the table!

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user.js'));
//login route
app.use('/api/login', require('./routes/session'));
app.use('/api/test', function (req, res) {
    res.send("Hello World!!");
});


app.listen(3000, function () {
    console.log("app is listening on 3000");
});

//Need to create a user object and use sequelize to put that user into
//our database.