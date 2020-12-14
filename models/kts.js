const pool = require('../utils/pool');

module.exports = class Kts {
    id;
    mood;
    temp;

    constructor(row) {
      this.id = String(row.id);
      this.mood = row.mood;
      this.temp = String(row.temp);
    }
    
    // Create
    static async insert({ mood, temp }) {
      const { rows } = await pool.query(
        'INSERT INTO kts (mood, temp) VALUES ($1, $2) RETURNING *',
        [mood, temp]
      );

      return new Kts(rows[0]);
    }

    // Read
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM kts');

      return rows.map(row => new Kts(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM kts WHERE id=$1',
        [id]);

      return new Kts(rows[0]);
    }

    // Update
    static async update(id, { mood, kts }) {
      const { rows } = await pool.query(
        `UPDATE kts
            SET
              mood=$1,
              temp=$2
            WHERE id=$3
            RETURNING *`,
        [ mood, temp , id]
      );

      return new Kts(rows[0]);
    }

    // Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM kts WHERE id=$1 RETURNING *',
        [id]);
  
      return new Kts(rows[0]);
    }
    
};