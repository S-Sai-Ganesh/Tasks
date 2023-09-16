const data = {}; //To store data

for(var i=0;i<50;i++){
    data[i] = Math.floor(Math.random()*101); // To generate random data
}

let tem = Object.entries(data).sort((a,b)=> b[1]-a[1]); // To sort random data in descending order
console.log('tem',tem);

const res = []; // To store result 

for(var i=0;i<5;i++){
    res.push(tem[2]); // 3rd highest value among data
    tem.splice(0,3); // Removing 3 highest values from data
}

console.log('result',res);