const express = require('express');
const fortunes = require('./data/fortunes.json');
const fs = require('fs')
// const bodyParser =  require('body-parser');


const app = express();
// app.use(bodyParser());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const writeFortunes = (json)=>{
    fs.writeFile('./data/fortunes.json',JSON.stringify(json),error=>console.log(error));
}

app.get('/fortunes',(request,response)=>{
    // response.send('requesting fortunes')
    response.json(fortunes)
})

app.get('/fortunes/random',(request,response)=>{ 
    const randomNumber = Math.trunc( Math.random() * fortunes.length );
    const randomFortune = fortunes[randomNumber]
    response.json(randomFortune);
})

app.get('/fortunes/:id',(request,response)=>{
    response.json(fortunes.find((element)=>{return request.params.id == element.id;}));

})

app.post('/fortunes',(request,response)=>{
    const {message,spiritual_animal,lucky_number} = request.body;

    const fortuneIDs = fortunes.map((element)=> element.id)
    const newFortune = fortunes.concat({
        id:(fortuneIDs.length > 0 ? Math.max(...fortuneIDs) : 0 ) + 1,
        spiritual_animal,
        lucky_number,
        message
    })
    // const newFortunes = [...fortunes,{id:(fortunes.length)+1,message,spiritual_animal,lucky_number}]
    writeFortunes(newFortune)
    response.json(newFortune)
});

app.put('/fortunes/:id',(request,response)=>{
    const {id} = request.params;
    const {message,lucky_number,spiritual_animal} = request.body;

        const oldFortune =  fortunes.find(element=>element.id==id);
        ['message','spiritual_animal','lucky_number'].forEach((element)=>{
            if(request.body[element]) oldFortune[element] = request.body[element]
        })
        console.log(oldFortune)
    
        writeFortunes(fortunes)
        
    response.send(fortunes)
});

app.delete('/fortunes/:id',(request,response)=>{
    const { id } = request.params;
    const newFortunes = fortunes.filter( element => element.id != id);
    writeFortunes(newFortunes)
    response.json(newFortunes)
}) 

module.exports = app;