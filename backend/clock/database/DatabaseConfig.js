const Knex = require('knex');
const KnexConfig = require('../knexfile');


const knexCache = {};
const MAX_CONNECTION_CACHE = 10;

/**
 * @type {import("express").RequestHandler}
 * 
 */
const initializeDB = async function (req, res, next) {
	

	/**
	 * @type {import ("knex").Knex}
	 */

	let _knex = knexCache[`tenant_${req.user.tenant_id}`];

	if (!_knex) {

		_knex = Knex({
			...KnexConfig,
			connection: `postgres://${process.env.POSTGRES_SECONDARY_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?timezone=utc`,
			pool: {
				min: 2, 
				max: 8,
				afterCreate: (conn, done) => {

					conn.query(`set app.current_tenant = ${req.user.tenant_id}`, done);

				}
			}
		});

		knexCache[`tenant_${req.user.tenant_id}`] = _knex;

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
