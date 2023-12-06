# Weather App on a Map

Weather App on a Map is a JavaScript web app that combines the power of Firebase, OpenWeather, and Google Maps.

## APIs Used

- Firebase: https://firebase.google.com/docs/reference
- OpenWeather: https://openweathermap.org/api
- Google Maps: https://developers.google.com/maps/apis-by-platform

## Features include:

- Weather Data. Displays current weather data on the map and in table format.
- Authentication. Users need to sign in or register to use the app.
- Search. Users can search for the city name. 
- Navigate and Click. Users can click on any location on the map.
- Responsive. Designed for desktop, tablet and mobile users.

## How it Works

- The app uses geolocation to automatically locate user's GPS location.
```
navigator.geolocation.getCurrentPosition() method allows access to the current location of the user's device
```
- Search function fetches weather data from OpenWeather using "city" parameter and stores the data to Firebase database.
```
https://api.openweathermap.org/data/2.5/weather?q=[CITY]&units=metric&appid=[API-KEY]
```
- Click on the map function fetches weather data from OpenWeather using "latitude" and "longtitude" prameters and stores the data to Firebase database.
```
https://api.openweathermap.org/data/2.5/weather?lat=[LAT]&lon=[LONG]&units=metric&appid=[API-KEY]
```
- Weather data is retrieved from Firebase and displayed in a user-readable and tabular format and on a pop-up location point on Google Maps.
```
https://maps.googleapis.com/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}&key=[API-KEY]
```