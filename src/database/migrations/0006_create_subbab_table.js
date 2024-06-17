exports.up = async (knex) => {
  await knex.schema.createTable("subbab", (table) => {
    table.increments("id").primary();
    table.string("nama_sub_bab", 100).notNullable();
    table.text("thumbnail_sub_bab").notNullable();
    table.boolean("is_free").notNullable();
    table.integer("id_bab").unsigned().notNullable();
    table.foreign("id_bab").references("id").inTable("bab");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("subbab");
};
