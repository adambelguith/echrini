const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const session = require('express-session');


var sess = {
    secret: 'keyboard cat',
    cookie: {}
}
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
  
app.use(session(sess))


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome "});
});

require('./app/routes/admin.routes.js')(app);
require('./app/routes/seller.routes.js')(app);
require('./app/routes/buyer.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/cart.routes.js')(app);

// listen for requests
app.listen(3000, "192.168.1.2",   () => {
    console.log("Server is listening on port 3000");
});