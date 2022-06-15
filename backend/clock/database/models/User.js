const { Model } = require('objection');

class User extends Model {

	static get tableName() {
		return 'User';
	}
	
	static get jsonSchema() {
		return {
			type: 'object',
			required: ['email', 'password'],

			properties: {
				id: { type: 'uuid' },
				email: { type: 'string' },
				password: { type: 'string', minLength: 6 },
				tenant_id: { type: 'uuid' },
				is_active: {
					type: 'boolean',
					default: false
				}
			}
		};
	}

	// static get relationMappings() {
	// 	return {
	// 		role: {
	// 			relation: Model.HasOneRelation,
	// 			modelClass: path.join(__dirname, "RoleAssignment"),
	// 			join: {
	// 				from: "User.id",
	// 				to: "Role_Assignment.user_id"
	// 			}
	// 		},

	// 		role_assignment: {
	// 			relation: Model.HasOneThroughRelation,
	// 			modelClass: path.join(__dirname, "Role"),

	// 			join: {
	// 				from: "User.id",
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


module.exports = User;