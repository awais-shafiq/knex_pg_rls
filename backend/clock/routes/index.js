const TenantController = require('../controllers/TenantController');
const UserController = require('../controllers/UserController');
const TeamController = require('../controllers/TeamController');

const router = require('express').Router();

router.post('/v1/tenants', async (req, res) => {

	const { result, error } = await TenantController.create(req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.get('/v1/tenants', async (req, res) => {

	const { result, error } = await TenantController.list(req.knex);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.post('/v1/users', async (req, res) => {

	const { result, error } = await UserController.create(req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.get('/v1/users', async (req, res) => {

	const { result, error } = await UserController.list(req.knex);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.post('/v1/teams', async (req, res) => {

	const { result, error } = await TeamController.create(req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.get('/v1/teams', async (req, res) => {

	const { result, error } = await TeamController.list(req.knex);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

module.exports = router;