/**
 * 
 * @param {import ("knex").Knex} knex 
 * @returns 
 */
exports.up = async function (knex) {

	// await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	try {
		await knex.schema
			.createTable('Tenant', (table) => {
				table.increments();
				table.string('domain').notNullable();
				table.timestamps(true, true, false);
			})
			.createTable('User', (table) => {
				table.increments();
				table.string('email').notNullable();
				table.string('phone');
				table.string('password').notNullable();
				table.boolean('is_active').defaultTo(false);
				table.timestamps(true, true, false);
			})
			.createTable('Role', (table) => {
				table.increments();
				table.string('name').notNullable();
			})
			.createTable('UserRole', (table) => {
				table.increments();
				table.integer('tenant_id').notNullable().references('id').inTable('Tenant').onUpdate('CASCADE').onDelete('CASCADE');
				table.integer('user_id').notNullable().references('id').inTable('User').onUpdate('CASCADE').onDelete('CASCADE');
				table.integer('role_id').references('id').inTable('Role').onUpdate('CASCADE').onDelete('CASCADE');
				table.unique(['tenant_id', 'user_id', 'role_id']);
				table.timestamps(true, true, false);
			})
			.createTable('Team', (table) => {
				table.increments();
				table.string('name');
				table.integer('tenant_id').notNullable().references('id').inTable('Tenant').onUpdate('CASCADE').onDelete('CASCADE');
				table.timestamps(true, true, false);
			})
			.createTable('UserTeam', (table) => {
				table.increments();
				table.integer('team_id').notNullable().references('id').inTable('Team').onUpdate('CASCADE').onDelete('CASCADE');
				table.integer('user_id').notNullable().references('id').inTable('User').onUpdate('CASCADE').onDelete('CASCADE');
				table.unique(['team_id', 'user_id']);
				table.timestamps(true, true, false);
			})
			//Grant Permissoins in schema
			.raw('GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on ALL TABLES IN SCHEMA public to PUBLIC;')
			.raw('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to PUBLIC;')
			.raw(
				`
				CREATE POLICY rls_tenant_policy ON "Tenant" FOR all TO public USING (id=current_setting('app.tenant_id')::int) WITH CHECK(true);
				ALTER TABLE "Tenant" ENABLE ROW LEVEL SECURITY;
				`
			)
			.raw(
				`
				CREATE POLICY rls_user_role_policy ON "UserRole" FOR all TO public USING(tenant_id=current_setting('app.tenant_id')::int) WITH CHECK(tenant_id=current_setting('app.tenant_id')::int);
				ALTER TABLE "UserRole" ENABLE ROW LEVEL SECURITY;
				`
			)
			// .raw('ALTER TABLE "UserRole" ENABLE ROW LEVEL SECURITY')
			.raw(
				`
				CREATE POLICY rls_team_policy ON "Team" FOR all TO public USING (tenant_id=current_setting('app.tenant_id')::int) WITH CHECK (tenant_id=current_setting('app.tenant_id')::int);
				ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
				`
			)
			.raw(
				`
				CREATE POLICY rls_user_team_policy ON "UserTeam" FOR all TO public 
				USING(team_id in (SELECT "Team".id FROM "Team" WHERE tenant_id = current_Setting('app.tenant_id')::int)) 
				WITH CHECK(
					user_id in (SELECT user_id from "UserRole" WHERE tenant_id = current_setting('app.tenant_id')::int) 
					AND 
					team_id in (SELECT id FROM "Team" WHERE tenant_id = current_setting('app.tenant_id')::int)
				);

				ALTER TABLE "UserTeam" ENABLE ROW LEVEL SECURITY;
				`
			);
		// .raw('ALTER TABLE "Tenant" ENABLE ROW LEVEL SECURITY;')
		// .raw(
		// 	`
		// 	CREATE POLICY insert_user_policy ON "User" FOR INSERT TO public WITH CHECK(true);
		// 	CREATE POLICY rls_user_policy ON "User" FOR all TO public USING (id = current_setting('app.user_id')::int);
		// 	ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
		// 	`
		// )
		// .raw('ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY');
		// .raw(
		// 	`
		// 	CREATE POLICY insert_tenant_policy ON "Tenant" FOR INSERT TO public WITH CHECK(true);
		// 	CREATE POLICY select_tenant_policy ON "Tenant" FOR SELECT TO public USING (id=current_setting('app.tenant_id')::int);
		// 	CREATE POLICY update_tenant_policy ON "Tenant" FOR UPDATE TO public USING (id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY delete_tenant_policy ON "Tenant" FOR DELETE TO public USING (id=current_setting('app.tenant_id')::INTEGER);
		// 	`
		// )
		// .raw(
		// 	`
		// 	CREATE POLICY insert_tenant_policy ON "Tenant" FOR INSERT TO public WITH CHECK(true);
		// 	CREATE POLICY select_tenant_policy ON "Tenant" FOR SELECT TO public USING (id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY update_tenant_policy ON "Tenant" FOR UPDATE TO public USING (id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY delete_tenant_policy ON "Tenant" FOR DELETE TO public USING (id=current_setting('app.tenant_id')::INTEGER);
		// 	`
		// )
		// .raw('ALTER TABLE "Tenant" ENABLE ROW LEVEL SECURITY;')
		// .raw(
		// 	`
		// 	CREATE POLICY insert_user_policy ON "User" FOR INSERT TO public WITH CHECK(true);
		// 	CREATE POLICY select_user_policy ON "User" FOR SELECT TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY update_user_policy ON "User" FOR UPDATE TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY delete_user_policy ON "User" FOR DELETE TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER);
		// 	`
		// )
		// .raw('ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;')
		// .raw(
		// 	`
		// 	CREATE POLICY insert_team_policy ON "Team" FOR INSERT TO public WITH CHECK(tenant_id=current_setting('app.tenant_id')::INTEGER);
		// 	CREATE POLICY select_team_policy ON "Team" FOR SELECT TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER AND id in (select * from unnest(current_setting('app.tenant_team_ids', true)::int[])));
		// 	CREATE POLICY update_team_policy ON "Team" FOR UPDATE TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER AND id in (select * from unnest(current_setting('app.tenant_team_ids', true)::int[])));
		// 	CREATE POLICY delete_team_policy ON "Team" FOR DELETE TO public USING (tenant_id=current_setting('app.tenant_id')::INTEGER AND id in (select * from unnest(current_setting('app.tenant_team_ids', true)::int[])));
		// 	`
		// )
		// .raw('ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY');
	} catch (err) {
		console.log(err.message);
	}
	// .raw(
	// 	`
	// 	CREATE POLICY team_rls_policy ON "Team" FOR all TO public USING (EXISTS (SELECT * FROM "TenantTeam" INNER JOIN "Tenant" ON ("TenantTeam".tenant_id = "Tenant".id) WHERE "Tenant".id=current_setting('app.tenant_id')::INTEGER))
	// 	`
	// )
	// CREATE POLICY insert_team_policy ON "Team" FOR INSERT TO public USING (EXISTS (SELECT * FROM "Tenant" WHERE id=current_setting('app.tenant_id')::INTEGER)) WITH CHECK(true);


};

/**
 * 
 * @param {import ("knex").Knex} knex 
 * @returns 
 */
exports.down = function (knex) {
	return knex.schema
		.raw('DROP POLICY rls_user_role_policy ON "UserRole"')
		.dropTable('UserTeam')
		.dropTable('Team')
		.dropTable('UserRole')
		.dropTable('Role')
		.dropTable('User')
		.dropTable('Tenant');
};

// `
// SELECT * FROM "User" INNER JOIN (
// 	SELECT * FROM "UserRole" INNER JOIN (
// 		SELECT * FROM "Tenant" INNER JOIN "Team" ON "Tenant".id = "Team".tenant_id WHERE "Team".tenant_id = 1
// 	) as tenant_team ON "UserRole".tenant_id = tenant_team.tenant_id;
// ) as user_tenant_role
// `;

// --CREATE POLICY team_rls_policy ON "Team" FOR all TO public USING (EXISTS (SELECT * FROM "TenantTeam" INNER JOIN "Tenant" ON ("TenantTeam".tenant_id = "Tenant".id) WHERE "Tenant".id=current_setting('app.current_tenant')::INTEGER))
// --CREATE POLICY rls_user_policy ON "User" FOR all TO public USING (EXISTS (SELECT * FROM "UserRole" INNER JOIN "Tenant" ON ("UserRole".tenant_id = "Tenant".id) WHERE "Tenant".id=current_setting('app.tenant_id')::INTEGER))