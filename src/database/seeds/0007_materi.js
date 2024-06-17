exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("materi").insert([
    {
      nama_materi: "Video 1.1",
      thumbnail_materi: "thumbnail1.png",
      tipe_materi: "Video",
      xp: 125,
      gold: 10,
      id_sub_bab: 1,
    },
    {
      nama_materi: "Video 1.2",
      thumbnail_materi: "thumbnail2.png",
      tipe_materi: "Video",
      xp: 125,
      gold: 10,
      id_sub_bab: 1,
    },
    {
      nama_materi: "Video 1.1",
      thumbnail_materi: "thumbnail3.png",
      tipe_materi: "Single Quiz",
      xp: 125,
      gold: 50,
      id_sub_bab: 1,
    },
  ]);
};
