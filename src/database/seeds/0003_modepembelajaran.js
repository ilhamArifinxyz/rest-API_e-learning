exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("modepembelajaran").insert([
    {
      nama_mode_pembelajaran: "Pembelajaran Tematik",
      deskripsi_mode_pembelajaran: "Deskripsi pembelajaran tematik",
      id_kelas: 1,
    },
    {
      nama_mode_pembelajaran: "Pembelajaran Menurut Topik",
      deskripsi_mode_pembelajaran: "Deskripsi pembelajaran menurut topik",
      id_kelas: 1,
    },
    {
      nama_mode_pembelajaran: "Pembelajaran Merdeka",
      deskripsi_mode_pembelajaran: "Deskripsi pembelajaran merdeka",
      id_kelas: 1,
    },
  ]);
};
