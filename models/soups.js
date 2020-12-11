const pool = require('../utils/pool');

module.exports = class Soups {
    id;
    savory;
    color;

    constructor(row) {
      this.id = String(row.id);
      this.savory = row.savory;
      this.color = row.color;
    }

    
    static async insert({ savory, color }) {
      const { rows } = await pool.query(
        'INSERT INTO soups (savory, color) VALUES ($1, $2) RETURNING *',
        [savory, color]
      );
      
      return new Soups(rows[0]);
    }

   
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM soups');
      
      return rows.map(row => new Soups(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM soups WHERE id=$1',
        [id]);
  
      return new Soups(rows[0]);
    }

    
    static async update(id, { savory, color }) {
      const { rows } = await pool.query(
        `UPDATE soups
                  SET
                    savory=$1,
                    color=$2
                  WHERE id=$3
                  RETURNING *`,
        [savory, color, id]
      );
      
      return new Soups(rows[0]);
    }

    
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM soups WHERE id=$1 RETURNING *',
        [id]);
        
      return new Soups(rows[0]);
    }

};