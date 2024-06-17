const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("users").insert([
    {
      username: "Andi",
      email: "andi@example.com",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      username: "Budi",
      email: "budi@example.com",
      password: bcrypt.hashSync("password123", 10),
    },
  ]);
};
