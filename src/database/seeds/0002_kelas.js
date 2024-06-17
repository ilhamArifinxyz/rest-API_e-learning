exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("kelas").insert([
    {
      nama_kelas: "kelas 1",
    },
    {
      nama_kelas: "kelas 2",
    },
    {
      nama_kelas: "kelas 3",
    },
  ]);
};
