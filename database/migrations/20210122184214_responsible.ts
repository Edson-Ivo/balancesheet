import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("responsible", table => {
    table
      .uuid("_id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("companyId")
      .unique()
      .notNullable();
    table.date("date");
    table.timestamps(undefined, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("responsible");
}
