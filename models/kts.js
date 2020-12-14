const pool = require('../utils/pool');
const Soups = require('./soups')

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
    static async insert({ mood, temp, soups = [] }) {
      const { rows } = await pool.query(
        'INSERT INTO kts (mood, temp) VALUES ($1, $2) RETURNING *',
        [mood, temp]
      );

      await pool.query(
        `INSERT INTO kts_soups (kts_id, soups_id)
        SELECT ${rows[0].id}, id FROM soups WHERE flavor = ANY($1::text[])`,
        [soups]
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
        `SELECT
            kts.*,
            array_agg(soups.flavor) AS soups
         FROM
            kts_soups
          JOIN kts
          ON kts_soups.kts_id = kts.id
          JOIN soups
          ON kts_soups.soups_id = soups.id
          WHERE kts.id=$1
          GROUP BY kts.id`,
        [id]);

      if(!rows[0]) throw new Error(`No kts found for id ${id}`);

      return {
        ...new Kts(rows[0]),
        soups: rows[0].soups
      };
    }

    // Update
    static async update(id, { mood, temp }) {
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