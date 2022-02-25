const pool = require("../db/index.js");
const { Router } = require("express");

const router = new Router();

router.get("/", (request, response,next) => {
  const query = "SELECT * FROM person ORDER BY id ASC";
  pool.query(query, (error, sqlResponse) => {
    if (error) return next(error);
    response.send(sqlResponse.rows);
  });
});

router.get("/:id", (request, response,next) => {
  const { id } = request.params;
  const query = `SELECT * FROM person WHERE country_of_birth =($1) ORDER BY first_name ASC`;
  pool.query(query, [id], (error, sqlResponse) => {
    if (error) return next(error);
    response.send(sqlResponse.rows);
  });
});

module.exports=router;