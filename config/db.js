const pgp = require('pg-promise')();

const db = pgp({
  user: 'postgres',
  host: 'localhost',
  database: 'hashMedia',
  password: 'postgres'
});

db.connect()
  .then(obj => {
    obj.done();
    console.log('Connected to the database!');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error.message);
  });

module.exports = db;
