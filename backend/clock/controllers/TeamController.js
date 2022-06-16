const Team = require('../database/models/Team');
const { getError } = require('../utility/Exceptions');
const { StatusCode } = require('../utility/KeyMaster');

module.exports = {

	create: async (body) => {

		try {

			const data = await Team.query().insertGraph(body);

			return { result: { status: StatusCode.CREATED, data: data } };

		} catch (err) {
			return { error: getError(err) };
		}

	},

	/**
	 * 
	 * @param {import ("knex").Knex} knex 
	 * @returns 
	 */
	list: async (knex) => {

		try {

			const data = await Team.query(knex).throwIfNotFound();


			return { result: { status: StatusCode.SUCCESS, data: data } };
	

		} catch (err) {
			return { error: getError(err) };
		}

	},

};