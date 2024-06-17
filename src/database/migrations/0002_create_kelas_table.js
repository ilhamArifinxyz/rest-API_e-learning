exports.up = async (knex) => {
  await knex.schema.createTable("kelas", (table) => {
    table.increments("id").primary();
    table.string("nama_kelas", 100).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("kelas");
};
