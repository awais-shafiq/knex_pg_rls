/**
 * 
 * @param {import ("knex").Knex} knex 
 * @returns 
 */
exports.up = function (knex) {

	// await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return knex.schema
		.createTable('Tenant', (table) => {
			table.increments();
			table.string('domain').notNullable();
			table.timestamps(true, true, false);
		})
		.createTable('User', (table) => {
			table.increments();
			table.string('email').notNullable();
			table.string('password').notNullable();
			table.integer('tenant_id').references('id').inTable('Tenant').onUpdate('CASCADE').onDelete('CASCADE');
			table.boolean('is_active');
			table.timestamps(true, true, false);
		})
		.createTable('Team', (table) => {
			table.increments();
			table.string('name');
		})
		.createTable('TenantTeam', (table) => {
			table.increments();
			table.integer('team_id').notNullable().references('id').inTable('Team').onUpdate('CASCADE').onDelete('CASCADE');
			table.integer('tenant_id').notNullable().references('id').inTable('Tenant').onUpdate('CASCADE').onDelete('CASCADE');
		})
		.raw('GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on ALL TABLES IN SCHEMA public to PUBLIC;')
		.raw(
			`
			CREATE POLICY tenant_rls_policy ON "Tenant" FOR all TO public USING (id=current_setting('app.current_tenant')::INTEGER);
			`
		)
		.raw('ALTER TABLE "Tenant" ENABLE ROW LEVEL SECURITY;')
		.raw(
			`
			CREATE POLICY user_rls_policy ON "User" FOR all TO public USING (tenant_id=current_setting('app.current_tenant')::INTEGER);
			`
		)
		.raw('ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;')
		.raw(
			`
			CREATE POLICY team_rls_policy ON "Team" FOR all TO public USING (EXISTS (SELECT * FROM "TenantTeam" INNER JOIN "Tenant" ON ("TenantTeam".tenant_id = "Tenant".id) WHERE "Tenant".id=current_setting('app.current_tenant')::INTEGER))
			`
		)
		.raw('ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY');


};
exports.down = function (knex) {
	return knex.schema
		.dropTable('TenantTeam')
		.dropTable('Team')
		.dropTable('User')
		.dropTable('Tenant');
};
