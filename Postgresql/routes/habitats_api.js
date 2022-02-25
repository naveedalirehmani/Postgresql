// third party libraries
const { Router } = require("express");
const router = Router();
const pool = require("../db/index.js");

// ---- GET
router.get("/", (request, response, next) => {
  const query = "SELECT * FROM habitats ORDER BY id DESC";
  pool.query(query, (error, sqlResponse) => {
    if (error) return next(error);
    response.json(sqlResponse.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  const query = `SELECT * FROM habitats WHERE id = '${id}'`;

  pool.query(query, (error, sqlresponse) => {
    if (error) return next(error);
    response.json(sqlresponse.rows);
  });
});

// ---- POST
router.post("/", (request, response, next) => {
  const { name, climate,temperature } = request.body;
  const query = `INSERT INTO habitats(name,climate,temperature) VALUES($1,$2,$3)`;

  pool.query(query, [name, climate, temperature], (error, sqlResponse) => {
    if (error) return next(error);
    response.redirect("/habitats");
  });
});

// ---- PUT
router.put("/:id", (request, response) => {
  const { id } = request.params;    
  const keys = ["name", "climate","temperature"];
  const fields = [];
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    let query = `UPDATE habitats SET ${field}=($1) WHERE id=($2)`;
    pool.query(query, [request.body[field], id], (error, sqlResponse) => {
      if (error) return next(error);
      if (fields.length - 1 == index) response.redirect("/habitats");
    });
  });
});

// ---- DELETE
router.delete('/:id',(request,response,next)=>{
    const {id} = request.params;
    const query = 'DELETE FROM habitats WHERE id=($1)';
    pool.query(query,[id],(error,sqlResponse)=>{
        if(error) return next(error);
        response.redirect('/habitats')
    })
})

module.exports = router;
