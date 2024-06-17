exports.up = async (knex) => {
  await knex.schema.createTable("modepembelajaran", (table) => {
    table.increments("id").primary();
    table.string("nama_mode_pembelajaran", 100).notNullable();
    table.text("deskripsi_mode_pembelajaran").notNullable();
    table.integer("id_kelas").unsigned().notNullable();
    table.foreign("id_kelas").references("id").inTable("kelas");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("modepembelajaran");
};
