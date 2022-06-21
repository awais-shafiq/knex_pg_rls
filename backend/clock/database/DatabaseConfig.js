const Knex = require('knex');
const KnexConfig = require('../knexfile');


const knexCache = {};
const MAX_CONNECTION_CACHE = 10;

/**
 * @type {import("express").RequestHandler}
 * 
 */
const initializeDB = async function (req, res, next) {


	/***
	 * @type {import ("knex").Knex}
	 */

	let _knex = knexCache[`tenant_${req.user.tenant_id}_user_${req.user.id}`];

	if (!_knex) {

		if (!req.user || !req.user.role_scopes || !Array.isArray(req.role_scopes)) {
			res.status(404).json({ message: 'Invalid user header' });
			return;
		}

		const t_placeholder = `'{${req.user.role_scopes.toString()}}'`;

		_knex = Knex({
			...KnexConfig,
			connection: `postgres://${process.env.POSTGRES_SECONDARY_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?timezone=utc`,
			// ...(req.method.toUpperCase() === 'POST' && { connection: `postgres://${process.env.POSTGRES_SECONDARY_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?timezone=utc` }),
			pool: {
				min: 2,
				max: 4,
				afterCreate: (conn, done) => {

					conn.query(
						`
						set app.tenant_id = ${req.user.tenant_id};
						set app.user_id = ${req.user.user_id};
						set app.tenant_team_ids = ${t_placeholder};
						`,
						done
					);

				}
			}
		});

		knexCache[`tenant_${req.user.tenant_id}_user_${req.user.id}`] = _knex;

		if (Object.keys(knexCache).length > MAX_CONNECTION_CACHE) {

			const firstCacheKey = Object.keys(knexCache)[0];
			const knexCached = knexCache[firstCacheKey];
			await knexCached.destroy();
			delete knexCache[firstCacheKey];

		}


	}

	req.knex = _knex;
	next();

};


module.exports = { initializeDB };
