exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("subbab").insert([
    {
      nama_sub_bab: "Mengenal Bilangan 1_10 (1)",
      thumbnail_sub_bab: "thumbnail1.png",
      is_free: true,
      id_bab: 1,
    },
    {
      nama_sub_bab: "Mengenal Bilangan 1_10 (2)",
      thumbnail_sub_bab: "thumbnail2.png",
      is_free: false,
      id_bab: 1,
    },
    {
      nama_sub_bab: "Lebih Besar? Lebih Kecil? 1-10",
      thumbnail_sub_bab: "thumbnail3.png",
      is_free: false,
      id_bab: 1,
    },
  ]);
};
