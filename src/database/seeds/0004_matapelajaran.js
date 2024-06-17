exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("matapelajaran").insert([
    {
      nama_mata_pelajaran: "Matematika",
      Thumbnail_mata_pelajaran: "thumbnail1.png",
      id_mode_pembelajaran: 1,
    },
    {
      nama_mata_pelajaran: "Bahasa Indonesia",
      Thumbnail_mata_pelajaran: "thumbnail2.png",
      id_mode_pembelajaran: 1,
    },
    {
      nama_mata_pelajaran: "IPA Terpadu",
      Thumbnail_mata_pelajaran: "thumbnail3.png",
      id_mode_pembelajaran: 1,
    },
  ]);
};
