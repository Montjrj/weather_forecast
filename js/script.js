var timeDisplayEl = $('#time-display'); 
var apiKey = "f073b4eb68aa0b3ed9eedc14f3a8c1b2"
// var city = document.getElementById("#search_value")
var city ="Denver"




function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }


function getLocation() {

    var queryUrl =  "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(queryUrl)
     .then(function(response) {  
            return response.json()
        })
    .then(function(data) {

        var lat = data[0].lat
        var lon = data[0].lon

        console.log(data)
        console.log(lat)
        console.log(lon)
        getCurrentWeather(lat, lon)
        // getFutureWeather(lat, lon)

        })


}
getLocation()

function getCurrentWeather(lat, lon) {

    var queryUrl =  "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&lang=en"

    fetch(queryUrl)
     .then(function(response) {
            return response.json()
        })
    .then(function(data) {

        console.log(data)
        console.log(data.name)
        console.log(data.main.temp)
        console.log(data.main.humidity)
        console.log(data.wind.speed)
        console.log(data.dt)
        console.log(data.weather[0].icon)
        var dateFormat = dayjs.unix(data.dt).format('D, MMM. YYYY')
        var dateDisplay = dateFormat
        var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png"
        var iconcode = data.weather[0].icon 
        var name = $("<h2>").text(data.name)
        var temp = $("<p>").text("Temp: " + Math.round(data.name.temp) + " °F ")
        var windspeed = $("<p>").text("Wind: " + Math.round(data.wind.speed) + " MPH")
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
        var icon = $("<img>").attr("src", iconurl)



        })

}


// getFutureWeather() {

//     var queryUrl =  "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=" + apiKey;
//     fetch(queryUrl)
//      .then(function(response) {
//             console.log(response)
//             return response.json()
//         })
//     .then(function(data) {

//         console.log(data)
//         console.log(data.list[0].main.humidity)

//         })

// }

// getFutureWeather(); 
 // displayTime(); 