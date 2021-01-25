import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("balancesheet", table => {
    table.increments("i").primary();
    table.string("classification", 80).notNullable();
    table.string("description", 80).notNullable();
    table.string("description_nd", 80).notNullable();
    table.decimal("initialCash", 14, 2).notNullable();
    table.decimal("debit", 14, 2).notNullable();
    table.decimal("credit", 14, 2).notNullable();
    table.decimal("finalCash", 14, 2).notNullable();
    table
    .uuid("responsible")
    .references("_id")
    .inTable("responsible")
    .notNullable();
    table.timestamps(undefined, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("balancesheet");
}
