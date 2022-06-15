// const { checkOrigin } = require("../controllers/OriginController");
// const { validateToken } = require("./Authentication");

//Allow Cross-origin resource sharing
exports.crossOriginResource = async function (req, res, next) {

	// const allowOrigins = ["https://pr117.alt.imroz.tech", "https://master.alt.imroz.tech", "http://localhost:3000"];

	// const origin = allowOrigins.find((allowOrigin) => allowOrigin === req.headers.origin);

	// if (req.method === "OPTIONS") {

	// 	if (req.headers.origin !== process.env.ALTRUNIC_WEB_ORIGIN) {

	// 		const { error } = await checkOrigin(req.headers.origin);

	// 		if (error) {
	// 			res.sendStatus(error.status);
	// 			return;
	// 		}

	// 	}
	// }

	// console.log(req.headers, "HEADERS");

	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow	
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, sentry-trace, content-type, authorization, accept');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}

};

exports.parseUser = function (req, res, next) {

	const userHeader = req.headers['user'];

	if (!userHeader) {
		res.status(404).send('Invalid Request');
	}

	req.user = JSON.parse(userHeader);

	next();

};