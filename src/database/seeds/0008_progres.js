exports.seed = function (knex) {
  // Menambahkan data pengguna awal ke tabel 'users'
  return knex("progres").insert([
    {
      id_user: 1,
      Id_materi: 1,
      status_progres: true,
    },
    {
      id_user: 1,
      Id_materi: 2,
      status_progres: true,
    },
    {
      id_user: 1,
      Id_materi: 3,
      status_progres: false,
    },
  ]);
};
