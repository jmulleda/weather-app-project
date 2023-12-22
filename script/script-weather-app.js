// My Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC7IlwWZfwWDgqreVC6U2FljmStcDPTpQs",
authDomain: "web104-project-jm.firebaseapp.com",
projectId: "web104-project-jm",
storageBucket: "web104-project-jm.appspot.com",
messagingSenderId: "917587784166",
appId: "1:917587784166:web:bf54ea74d6e8b82eee6627"
};
   
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get user's geolocation
function getGeolocation() {
   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 10);
                fetchWeatherData(latitude, longitude);
                
            },
            error => {
                console.error('Error getting geolocation:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
 }
 
 // Call the geolocation function on window load
 window.onload = getGeolocation();   

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(lat, lon) {
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3d356028ade341bc7eae2ac1cbc3048f`;
   fetch(apiUrl)
   .then(response => response.json())
       .then(data => {
           // Create an object with the relevant data
           let weatherData = {
               city: data.name,
               country: data.sys.country,
               time: new Date(data.dt * 1000).toLocaleTimeString(),
               long: data.coord.lon,
               lat: data.coord.lat,
               temperature: data.main.temp,
               feels: data.main.feels_like,
               min: data.main.temp_min,
               max: data.main.temp_max,
               pressure: data.main.pressure,
               humidity: data.main.humidity,
               windSpeed: data.wind.speed,
               visibility: data.visibility,
               description: data.weather[0].description,
               sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
               sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
           };
           // Create weather icon object
           let weatherIcon = {
               icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
           };
           
           // Save data to Firebase
           const db = firebase.firestore();
           db.collection('weatherData').doc('city').set(weatherData)
           
           .then(() => {
               console.log(weatherData);
               console.log('Weather data successfully saved to Firebase!');
               user.email = document.getElementById('user');
           })     
           // Update data on the table
           displayWeatherData(weatherData);
           
           // Display weather information in a popup on a map
           const popupContent = `
               <img src="${weatherIcon.icon}" alt="Weather Icon"><br> 
               <b>${weatherData.city}, ${weatherData.country}</b><br>
               Local Time: ${weatherData.time}<br>
               Temperature: ${weatherData.temperature}°C<br>
               Feels Like: ${weatherData.feels}°C<br>
               Description: ${weatherData.description}<br>
               Min: ${weatherData.min}°C<br>
               Max: ${weatherData.max}°C<br>
               Sunrise: ${weatherData.sunrise}<br>
               Sunset: ${weatherData.sunset}<br>
           `;

           const marker = L.marker([lat, lon]).addTo(map);
           marker.bindPopup(popupContent).openPopup();
       })

       .catch(error => {
           console.error('Error fetching weather data:', error);
       });
}   
    const weatherDataRef = db.collection('weatherData').doc('city');

    // Retrieve the data from Firestore
    weatherDataRef.get().then((doc) => {
        if (doc.exists) {
            // Display the data in the HTML body
            const weatherData = doc.data();
            displayWeatherData(weatherData);
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    // Display weather data in the HTML body as a table
    function displayWeatherData(data) {
        let weatherDataDisplay = document.getElementById('weatherDataDisplay');
        // Table structure
        const tableHTML = `
            <h3>Weather Data</h3>
            <table border="1">
                <tbody>
                    <tr>
                        <td><b>City, Country</b></td>
                        <td>${data.city}, ${data.country}</td>
                    </tr>                
                    <tr>
                        <td><b>Time</b></td>
                        <td>${data.time}</td>
                    </tr>    
                    <tr>
                        <td><b>Coordinates</b></td>
                        <td>${data.long}° long, ${data.lat}° lat</td>
                    </tr>
                    <tr>
                        <td><b>Temperature</b></td>
                        <td>${data.temperature}°C</td>
                    </tr>
                    <tr>
                        <td><b>Feels Like</b></td>
                        <td>${data.feels}°C</td>
                    </tr>
                    <tr>
                        <td><b>Description</b></td>
                        <td>${data.description}</td>
                    </tr>
                    <tr>
                        <td><b>Minimum</b></td>
                        <td>${data.min}°C</td>
                    </tr>
                    <tr>
                        <td><b>Maximum</b></td>
                        <td>${data.max}°C</td>
                    </tr>                
                    <tr>
                        <td><b>Sunrise</b></td>
                        <td>${data.sunrise}</td>
                    </tr>
                    <tr>
                        <td><b>Sunset</b></td>
                        <td>${data.sunset}</td>
                    </tr>
                </tbody>
            </table>
        `;
        weatherDataDisplay.innerHTML = tableHTML;
    }

// Create a map centered on a geolocation
const map = L.map('map').setView([0, 0], 1000);

// Google Maps
L.tileLayer(`https://maps.googleapis.com/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}&key=AIzaSyBYs2dQrIO9Qk-Q2CbFAW8unVlO6n8LrTg`, {
    attribution: '© Google Maps contributors'
}).addTo(map);

// Add a click event listener to the map
map.on('click', function (e) {
const { lat, lng } = e.latlng;

fetchWeatherData(lat, lng);

});


// Event listener for search by city name
document.getElementById('searchWeather').addEventListener('click', function () {
let cityInput = document.getElementById('city');
let cityName = cityInput.value.trim();
   if (cityName !== '') {
       searchByCity(cityName);
   }
});

// Search city name function
function searchByCity(cityName) {
   const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=3d356028ade341bc7eae2ac1cbc3048f`;
   fetch(cityURL)
       .then(response => response.json())
       .then(data => {
           const { lat, lon } = data.coord;
           map.setView([lat, lon], 10);
           let tableBody = document.getElementById('weatherDataDisplay');
           tableBody.innerHTML = ''; // Clear the existing content in the weatherTableBody
           fetchWeatherData(lat, lon);
           displayWeatherData(weatherData);
       })
       .catch(error => {
           console.error('Error fetching weather data:', error);
       });
}

//Sign out
function checkIfLoggedIn(){

    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log(user.email)
    alert(`Username ${user.email} has been signed out.`);
    signOut();
  } else {
   console.log("The user is not signed in.")
  }
});

}

function signOut(){
    firebase.auth().signOut().then(() => {
    console.log('User is signed out')
    window.open("./index.html", "_self");
    }).catch((error) => {
    // An error happened.
    });
}

// great work, this is awesome, I'd challenge you to start thinking about whether these functions could written in a Object Oriented Way and what the benefit would be
