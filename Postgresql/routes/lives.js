const { Router } = require('express');
const router = new Router();
const pool = require('../db/index.js');

router.get('/',(request,response)=>{
    const query = 'SELECT * FROM lives';
    pool.query(query,(error,sqlResponse)=>{
        if(error) return next(error);
        response.json(sqlResponse.rows);
    })
});


router.get('/conditions',(request,response)=>{
    const query = 'SELECT * FROM lives JOIN habitats ON habitats.name = lives.habitat';
    pool.query(query,(error,sqlResponse)=>{
        if(error) return next(error);
        response.json(sqlResponse.rows);
    })
});

module.exports = router