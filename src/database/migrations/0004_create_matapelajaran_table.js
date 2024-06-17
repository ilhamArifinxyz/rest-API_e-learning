exports.up = async (knex) => {
  await knex.schema.createTable("matapelajaran", (table) => {
    table.increments("id").primary();
    table.string("nama_mata_pelajaran", 100).notNullable();
    table.text("thumbnail_mata_pelajaran").notNullable();
    table.integer("id_mode_pembelajaran").unsigned().notNullable();
    table
      .foreign("id_mode_pembelajaran")
      .references("id")
      .inTable("modepembelajaran");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("matapelajaran");
};
