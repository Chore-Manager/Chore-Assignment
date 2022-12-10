const { Pool } = require('pg');

const PG_URI =
  'postgres://qaiuujgv:sLAXGr_6cCgMLCmZDkZKXUhKoW-Ezxns@raja.db.elephantsql.com/qaiuujgv';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executing query: ', text);
    return pool.query(text, params, callback);
  },
};
