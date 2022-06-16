const { Model } = require('objection');

class Team extends Model {

	static get tableName() {
		return 'Team';
	}
	
	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name'],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				tenant_id: { type: 'integer' },
			}
		};
	}

	// static get relationMappings() {
	// 	return {
	// 		role: {
	// 			relation: Model.HasOneRelation,
	// 			modelClass: path.join(__dirname, "RoleAssignment"),
	// 			join: {
	// 				from: "Team.id",
	// 				to: "Role_Assignment.user_id"
	// 			}
	// 		},

	// 		role_assignment: {
	// 			relation: Model.HasOneThroughRelation,
	// 			modelClass: path.join(__dirname, "Role"),

	// 			join: {
	// 				from: "Team.id",
	// 				through: {
	// 					from: "Role_Assignment.user_id",
	// 					to: "Role_Assignment.role_id",
	// 				},
	// 				to: "Role.id"
	// 			}

	// 		}

	// 	};
	// }
}


module.exports = Team;