exports.up = async (knex) => {
  await knex.schema.createTable("materi", (table) => {
    table.increments("id").primary();
    table.string("nama_materi", 100).notNullable();
    table.text("thumbnail_materi").notNullable();
    table
      .enum("tipe_materi", ["Video", "End Quiz", "Single Quiz", "Summary"])
      .notNullable();
    table.integer("xp").notNullable();
    table.integer("gold").notNullable();
    table.integer("id_sub_bab").unsigned().notNullable();
    table.foreign("id_sub_bab").references("id").inTable("subbab");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("materi");
};
