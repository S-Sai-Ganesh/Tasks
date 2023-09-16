const express = require('express');
const app = express();

app.use(express.json());

const vehicles = [ // Data of vehicles
    { id: 1, name: 'Sedan', booked: false, time: 0 },
    { id: 2, name: 'SUV', booked: false, time: 0 },
    { id: 3, name: 'Hatchback', booked: false, time: 0 },
];

app.get('/vehicles', (req, res) => { // To get info of all vehicles
    res.json(vehicles); 
});

app.get('/vehicles-available', (req,res) => { // To get info of all available vehicles
    let arr = []
    vehicles.forEach(vehicle => {
        if(!vehicle.booked) arr.push(vehicle);
    });

    res.json(arr);
});

app.get('/vehicle-book/:id', (req,res)=>{ // To book a vehicle with id and specific time
    const idHere = req.params.id;
    const timeHere = req.query.t;

    vehicles.forEach(vehicle=>{
        if(vehicle.id==idHere){
            vehicle.booked = true;
            vehicle.time = timeHere;
            res.json(vehicles);
        }
    })

})

app.listen(3000, () => {
  console.log('server is listening');
});