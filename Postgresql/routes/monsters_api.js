// third party libraries
const { Router } = require("express");
const router = Router();
const pool = require("../db/index.js");

// ---- GET
router.get("/", (request, response, next) => {
  const query = "SELECT * FROM monsters ORDER BY id DESC";
  pool.query(query, (error, sqlResponse) => {
    if (error) return next(error);
    response.json(sqlResponse.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  const query = `SELECT * FROM monsters WHERE id = '${id}'`;

  pool.query(query, (error, sqlresponse) => {
    if (error) return next(error);
    response.json(sqlresponse.rows);
  });
});

// ---- POST
router.post("/", (request, response, next) => {
  const { name, personality } = request.body;
  const query = `INSERT INTO monsters(name,personality) VALUES($1,$2)`;

  pool.query(query, [name, personality], (error, sqlResponse) => {
    if (error) return next(error);
    response.redirect("/monsters");
  });
});

// ---- PUT
router.put("/:id", (request, response,next) => {
  const { id } = request.params;    
  const keys = ["name", "personality"];
  const fields = [];
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    let query = `UPDATE monsters SET ${field}=($1) WHERE id=($2)`;
    pool.query(query, [request.body[field], id], (error, sqlResponse) => {
      if (error) return next(error);
      if (fields.length - 1 == index) response.redirect("/monsters");
    });
  });
});

// ---- DELETE
router.delete('/:id',(request,response,next)=>{
    const {id} = request.params;
    const query = 'DELETE FROM monsters WHERE id=($1)';
    pool.query(query,[id],(error,sqlResponse)=>{
        if(error) return next(error);
        response.redirect('/monsters')
    })
})

module.exports = router;
