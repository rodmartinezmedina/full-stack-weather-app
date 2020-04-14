var { Pool } = require('pg');

// DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name} <== postgreSQL adress structure.
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://rodrigo_postgresql:Nuncamiresatras83!@localhost:5432/weather-db';
const SSL = process.env.NODE_ENV === 'production'; // <== if we are in production it evaluates to 'true'. Otherwise to 'false'.

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on Idle PostgreSQL client.', err);
      process.exit(-1);
    })      
  }

  query(query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args [1];
      
      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error.' }, null);
        }
        callback({}, res.rows);
      });
    });
  }

  end() {

  }
}


module.exports = new Database();