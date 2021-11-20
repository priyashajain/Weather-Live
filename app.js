const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const https=require('https');

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey="fc04e3ffd2bd60d384d00eff3d0bb55b";
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+unit+"";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){

      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const feels_like=weatherData.main.feels_like;
      const pressure=weatherData.main.pressure;
      const humidity=weatherData.main.humidity;
      const speed=weatherData.wind.speed;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.render("list", {temperature: temp,  desc:description, iURL:imageURL, press:pressure, humid:humidity, wind_speed:speed, city:query, feels_like:feels_like});

    });
  });
});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
