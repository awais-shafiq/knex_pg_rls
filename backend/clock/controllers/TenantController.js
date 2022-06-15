const Tenant = require('../database/models/Tenant');
const { getError } = require('../utility/Exceptions');
const { StatusCode } = require('../utility/KeyMaster');

module.exports = {

	create: async (body) => {

		try {

			
			const data = await Tenant.query().insertGraph(body);

			return { result: { status: StatusCode.CREATED, data: data } };

		} catch (err) {
			return { error: getError(err) };
		}

	},

	list: async (knex) => {
		
		const trx = await Tenant.startTransaction(knex);

		try {
			
			// console.log('knex =>', knex);

			const data = await Tenant.query(trx);

			// await knex.destroy();

			await trx.commit();
			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			await trx.rollback();
			return { error: getError(err) };
		}

	},

};