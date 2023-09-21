var mysql = require('mysql2');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "task"
});

let poolProm = pool.promise();

async function task3(){
    await poolProm.execute('Truncate Table task.task2');
    for(var i=1;i<51;i++){

        temData = Math.floor(Math.random()*101); // To generate random data
        await poolProm.execute(`INSERT INTO task.task2 (id, data) VALUES (${i}, ${temData});`)
    }

    let selectData = await poolProm.execute('Select * FROM task.task2');
    let selectArray = selectData[0];
    console.log(selectArray,'Distinct Data');
    let sortedData = selectArray.sort((a,b)=> b.data-a.data); // To sort random data in descending order
    console.log(sortedData,'Sorted Data');

    const res = []; // To store result 
    const idExist = []; // Id of data to exist

    for(var i=0;i<5;i++){
        res.push(sortedData[2]); // 3rd highest value among data
        idExist.push(sortedData[2].id);
        sortedData.splice(0,3); // Removing 3 highest values from data
    }

    await poolProm.execute(`DELETE FROM task.task2 WHERE id NOT IN (${idExist[0]},${idExist[1]},${idExist[2]},${idExist[3]},${idExist[4]});`); // Deleting in database

    console.log(res, 'Result');
}

task3();
