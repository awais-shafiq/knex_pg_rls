const express = require('express');
const { crossOriginResource } = require('./utility/Middleware');
const dbConfig = require('./database/DatabaseConfig');
const router = require('./routes');

const app = express();

//Initialize Database
// dbConfig.initializeDB();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use(express.json());



//app routes
app.use(crossOriginResource);

app.use((req, res, next) => {

	const user = req.headers['user'];
	req.user = JSON.parse(user);
	next();

}, dbConfig.initializeDB);

app.use(router);

//Configure app on port
app.listen(process.env.PORT, () => {
	console.log('Server Started');
});