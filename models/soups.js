const pool = require('../utils/pool');

module.exports = class Soups {
    id;
    flavor;
    savory;
    color;

    constructor(row) {
      this.id = String(row.id);
      this.flavor = row.flavor;
      this.savory = row.savory;
      this.color = row.color;
    }

    
    static async insert({ flavor, savory, color }) {
      const { rows } = await pool.query(
        'INSERT INTO soups (flavor, savory, color) VALUES ($1, $2, $3) RETURNING *',
        [flavor, savory, color]
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

    
    static async update(id, { flavor, savory, color }) {
      const { rows } = await pool.query(
        `UPDATE soups
                  SET
                    flavor=$1,
                    savory=$2,
                    color=$3
                  WHERE id=$4
                  RETURNING *`,
        [flavor, savory, color, id]
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