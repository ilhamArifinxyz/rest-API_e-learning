exports.up = async (knex) => {
  await knex.schema.createTable("bab", (table) => {
    table.increments("id").primary();
    table.string("nama_bab", 100).notNullable();
    table.text("thumbnail_bab").notNullable();
    table.integer("id_mata_pelajaran").unsigned().notNullable();
    table
      .foreign("id_mata_pelajaran")
      .references("id")
      .inTable("matapelajaran");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("bab");
};
