// third party
const { Pool } = require('pg');

// importing credentials
const { user, host, database, password, port } = require('../secrets/db_configurations.js');

// connecting to database
const pool = new Pool({user,host,database,password,port});

module.exports = pool;