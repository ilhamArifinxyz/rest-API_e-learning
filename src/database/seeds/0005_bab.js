exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("bab").insert([
    {
      nama_bab: "Bilangan 0-10",
      thumbnail_bab: "thumbnail1.png",
      id_mata_pelajaran: 1,
    },
    {
      nama_bab: "Aplikasi 0-10",
      thumbnail_bab: "thumbnail2.png",
      id_mata_pelajaran: 1,
    },
    {
      nama_bab: "Bilangan 11-20",
      thumbnail_bab: "thumbnail3.png",
      id_mata_pelajaran: 1,
    },
  ]);
};
