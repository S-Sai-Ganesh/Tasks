const express = require('express');
const app = express();
const db = require('./database.js');

app.use(express.json());

app.get('/vehicles', async (req, res) => { // To get info of all vehicles
    let vehicles = await db.execute('Select * FROM task.task');
    res.json(vehicles[0]); 
});

app.get('/vehicles-available', async (req,res) => { // To get info of all available vehicles
    let arr = []
    let vehicles = await db.execute('Select * FROM task.task');
    vehicles[0].forEach(vehicle => {
        if(!vehicle.booked) arr.push(vehicle);
    });

    res.json(arr);
});

app.get('/vehicle-book/:id', async (req,res)=>{ // To book a vehicle with id and specific time
    const idHere = req.params.id;
    const timeHere = req.query.t;

    let vehicles = await db.execute('Select * FROM task.task');

    vehicles[0].forEach(async (vehicle)=>{
        if(vehicle.id==idHere){

            vehicle.booked = true;
            vehicle.time = timeHere;

            await db.execute(`UPDATE task.task SET booked = 1, time = ${timeHere} WHERE id = ${vehicle.id};`);

            res.redirect('/vehicles');
        }
    })

})

app.listen(3000, () => {
  console.log('server is listening');
});