const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE - POST /students
router.post('/', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)`;
  db.run(sql, [firstname, lastname, gender, age], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, firstname, lastname, gender, age });
  });
});

// READ ALL - GET /students
router.get('/', (req, res) => {
  db.all(`SELECT * FROM students`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ ONE - GET /students/:id
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM students WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(row);
  });
});

// UPDATE - PUT /students/:id
router.put('/:id', (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `
    UPDATE students 
    SET firstname = ?, lastname = ?, gender = ?, age = ?
    WHERE id = ?
  `;
  db.run(sql, [firstname, lastname, gender, age, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ id: req.params.id, firstname, lastname, gender, age });
  });
});

// DELETE - DELETE /students/:id
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM students WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado correctamente' });
  });
});

module.exports = router;