const { Model } = require('objection');

class Tenant extends Model {

	static get tableName() {
		return 'Tenant';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			// required: [],
			properties: {
				id: { type: 'uuid' },
				domain: { type: 'string' },
			}
		};
	}

}

module.exports = Tenant;