var timeDisplayEl = $('#time-display'); 
var apiKey = "f073b4eb68aa0b3ed9eedc14f3a8c1b2"
var userInput = document.getElementById("user_Input")
var searchHistory = " "
var submitBtn = document.getElementById("submit")




function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }



function getLocation(city) {

    var queryUrl =  "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(queryUrl)
     .then(function(response) {  
            return response.json()
        })
    .then(function(data) {

        console.log(data)
        savedcity(data[0].name)

        var lat = data[0].lat
        var lon = data[0].lon
        getCurrentWeather(lat, lon)
        getFutureWeather(lat, lon)

        })
}

function getCurrentWeather(lat, lon) {

    var queryUrl =  "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&lang=en"

    fetch(queryUrl)
     .then(function(response) {
            return response.json()
        })
    .then(function(data) {
        var dateFormat = dayjs.unix(data.dt).format('D, MMM. YYYY')
        var dateDisplay = dateFormat
        var iconcode = data.weather[0].icon 
        var iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`
        var name = $("<h2>").text(data.name)
        var temp = $("<p>").text("Temp: " + Math.round(data.main.temp) + " °F ")
        var windspeed = $("<p>").text("Wind: " + Math.round(data.wind.speed) + " MPH")
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
        var icon = $("<img>").attr("src", iconurl)

        $("#currentWeather").html("")

        $("#currentWeather").append(name, dateDisplay, icon, temp, windspeed, humidity)
        })
}


function getFutureWeather(lat, lon) {

    var queryUrl =  "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&lang=en"
            
    fetch(queryUrl)
     .then(function(response) {
            return response.json()
        })
    .then(function(data) {

            $('#futureWeather').html("")
        for(var i = 6; i < data.list.length; i += 8){

            var dateFormat = dayjs.unix(data.list[i].dt).format('D, MMM. YYYY')
            var dateDisplay = dateFormat
            var iconcode = data.list[i].weather[0].icon
            var iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`
            var temp = $("<p>").text("Temp: " + Math.round(data.list[i].main.temp) + " °F ")
            var windspeed = $("<p>").text("Wind: " + Math.round(data.list[i].wind.speed) + " MPH")
            var humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity + " %")
            var icon = $("<img>").attr("src", iconurl)

            
            var container = $("<div>").addClass("col-12 col-md-2 mb-3 boarder boarder-secondary ")
            container.append(dateDisplay, icon, temp, windspeed, humidity)
            $("#futureWeather").append(container)




        }


    


        })

}
function renderCityButton(){

    var savedcities = JSON.parse(localStorage.getItem("passcities"))|| []
    $("#passcitybuttons").html("")
    for(var i=0; i< savedcities.length; i++){

        var button = $("<button>").text(savedcities[i])
        button.on('click', function(e){

            e.preventDefault()
            getLocation(savedcities[i])
    
        })

        $("#passcitybuttons").append(button)
    }

}

function savedcity (cityName) {

    var savedcities = JSON.parse(localStorage.getItem("passcities"))|| []
    if(!savedcities.includes(cityName)){

        savedcities.push(cityName)
        localStorage.setItem("passcities", JSON.stringify(savedcities))

        renderCityButton();
    }


}

renderCityButton();
 displayTime(); 
 submitBtn.addEventListener('click',function(e) {

    e.preventDefault()


    console.log(userInput.value)
    getLocation(userInput.value)
    


 }) 