const express = require("express");
const app = express();
const knex = require("knex")(require("../database/knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");
const db = knex;

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

app.use(bodyParser.json());

const authController = express.Router();

// Register user
authController.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await knex("users").insert({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login user
authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").select("*").where("email", email).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Get List Kelas
authController.get("/kelas", async (req, res) => {
  try {
    const kelas = await knex("kelas").select("id", "nama_kelas");
    res.json(kelas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Get List Mode Pembeljaran
authController.get("/modepembelajaran/:idKelas", async (req, res) => {
  const { idKelas } = req.params;
  try {
    const modePembelajaran = await knex("modepembelajaran")
      .select("id", "nama_mode_pembelajaran")
      .where("id_kelas", idKelas);
    res.json(modePembelajaran);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Get list mata pelajaran berdasarkan mode pembelajaran dan kelas
authController.get("/matapelajaran/:idModePembelajaran", async (req, res) => {
  const { idModePembelajaran } = req.params;
  try {
    const mataPelajaran = await knex("matapelajaran")
      .select("id", "nama_mata_pelajaran", "thumbnail_mata_pelajaran")
      .where("id_mode_pembelajaran", idModePembelajaran);
    res.json(mataPelajaran);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Get list bab berdasarkan mata pelajaran yang dipilih
authController.get("/bab/:id_mata_pelajaran", async (req, res) => {
  const idMataPelajaran = req.params.id_mata_pelajaran;

  try {
    const babData = await db
      .select(
        "bab.id",
        "bab.nama_bab",
        "bab.thumbnail_bab",
        db.raw(
          "(SELECT COUNT(id) FROM subbab WHERE subbab.id_bab = bab.id AND subbab.is_free = 1) AS total_sub_bab_gratis"
        )
      )
      .from("bab")
      .where("bab.id_mata_pelajaran", idMataPelajaran);

    res.json(babData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Bab Progression Bar
authController.get("/bab/:id_mata_pelajaran/progress", async (req, res) => {
  const idMataPelajaran = req.params.id_mata_pelajaran;
  const userId = 1;

  try {
    const progressData = await db
      .select(
        "sb.id_bab",
        db.raw("COUNT(sb.id) AS total_sub_bab"),
        db.raw(
          "SUM(CASE WHEN p.status_progres THEN 1 ELSE 0 END) / COUNT(sb.id) AS progress"
        )
      )
      .from("subbab AS sb")
      .join("materi AS m", "sb.id", "=", "m.id_sub_bab")
      .join("progres AS p", function () {
        this.on("m.id", "=", "p.id_materi").andOn("p.id_user", "=", userId);
      })
      .whereIn("sb.id_bab", function () {
        this.select("id")
          .from("bab")
          .where("id_mata_pelajaran", idMataPelajaran);
      })
      .groupBy("sb.id_bab");

    res.json(progressData);
  } catch (error) {
    console.error("Error fetching sub-chapter progress:", error);
    res.status(500).json({ message: "Error fetching sub-chapter progress" });
  }
});

// Get list sub-bab berdasarkan bab yang dipilih
authController.get("/subbab/:id_bab", async (req, res) => {
  const idBab = req.params.id_bab;

  try {
    const subbabData = await db("subbab")
      .select("id", "nama_sub_bab", "thumbnail_sub_bab", "is_free")
      .where("id_bab", idBab);

    res.json(subbabData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

// Sub-bab Progression Bar
authController.get("/subbab/:id_bab/progress", async (req, res) => {
  const idBab = req.params.id_bab;
  const userId = 1;

  try {
    const progressData = await db
      .select(
        "sb.id",
        db.raw(
          "SUM(CASE WHEN p.status_progres THEN 1 ELSE 0 END) / COUNT(m.id) AS progress"
        )
      )
      .from("subbab AS sb")
      .join("materi AS m", "sb.id", "=", "m.id_sub_bab")
      .join("progres AS p", function () {
        this.on("m.id", "=", "p.id_materi").andOn("p.id_user", "=", userId);
      })
      .where("sb.id_bab", idBab)
      .groupBy("sb.id");

    res.json(progressData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan");
  }
});

//Get list material berdasarkan sub-bab yang dipilih
authController.get("/materi/:id_sub_bab", async (req, res) => {
  const idSubBab = req.params.id_sub_bab;
  const userId = 1;

  try {
    const materialData = await db
      .select(
        "m.id",
        "m.nama_materi",
        "m.thumbnail_materi",
        "m.tipe_materi",
        "m.xp",
        "m.gold",
        db.raw(
          "IF(p.status_progres IS NULL, 0, p.status_progres) AS status_progres"
        )
      )
      .from("materi AS m")
      .leftJoin("progres AS p", function () {
        this.on("m.id", "=", "p.id_materi").andOn("p.id_user", "=", userId);
      })
      .where("m.id_sub_bab", idSubBab);

    res.json(materialData);
  } catch (error) {
    console.error("Error fetching material details:", error);
    res.status(500).json({ message: "Error fetching material details" });
  }
});

module.exports = authController;
