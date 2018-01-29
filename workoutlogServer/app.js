let express = require('express');
let app = express();

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Anything you want, you got it!!");
});


app.listen(3000, function () {
    console.log("app is listening on 3000");
});