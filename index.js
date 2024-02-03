const http = require('http');
const fs = require('fs');
var requests = require("requests");

const homeFile = fs.readFileSync('home.html','utf-8');
const replaceVal = (tempVal,orgVal) =>{
    let temperature = tempVal.replace("{%tempval%}",Math.round((orgVal.main.temp-273.15)*100)/100);
    temperature = temperature.replace("{%tempmin%}",Math.round((orgVal.main.temp_min-273.15)*100)/100);
    temperature = temperature.replace("{%tempmax%}",Math.round((orgVal.main.temp_max-273.15)*100)/100);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;
}
const server = http.createServer((req,res) =>{
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=a6cd863586bdc1cf76cff6e8173c5479")
        
        
        .on("data",(chunk) =>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            // console.log(arrData);
            const realTimeData = arrData.map((val)=> replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
        })
        .on("end",(err) =>{
            if(err) return console.log("connection closed due to errors",err);
            res.end();
        });
    }
});

server.listen(3000,"127.0.0.1",()=>{
    console.log("listening on port 3000..");
})



















// const curDate = document.getElementById("date");
// let weathercon = document.getElementById("weathercon");

// const tempStatus = 'Clouds';

// const getCurrentDay = () =>{
//     var weekday = new Array(7);
//     weekday[0] = "Sun";
//     weekday[1] = "Mon";
//     weekday[2] = "Tue";
//     weekday[3] = "Wed";
//     weekday[4] = "Thu";
//     weekday[5] = "Fri";
//     weekday[6] = "Sat";

//     let CurrentTime = new Date();
//     let day = weekday[CurrentTime.getDay()];
//     return day;
// };

// const getCurrentTime = () => {

//     var months = [
//         "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec",
//     ];
//     var now = new Date();
//     var month = months[now.getMonth()+1];
//     var date = now.getDate();

//     let hours = now.getHours();
//     let mins = now.getMinutes();

//     let periods = "AM";

//     if(hours > 11){
//         periods = "PM";
//         if(hours > 12) hours -= 12;
//     }
//     if(mins < 10){
//         mins = "0" + mins;
//     }
//     return `${month}${date} | ${hours}:${mins}${periods}`;
// };

// curDate.innerHTML =  getCurrentDay() + " | " + getCurrentTime();