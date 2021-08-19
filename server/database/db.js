require('dotenv').config()
const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER_DB,
    password: process.env.DB_PW,
    host: "localhost",
    port: 5432,
    database: "pernmeme"
});

module.exports = pool;

// GRANT ALL PRIVILEGES ON DATABASE pernmeme TO carlsmed;
// GRANT ALL ON SCHEMA public TO carlsmed;
//**  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO carlsmed;
//**  GRANT USAGE, SELECT ON SEQUENCE meme_meme_id_seq TO carlsmed;
//**  GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO carlsmed;
