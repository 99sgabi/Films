var mainElement = new Vue({
    el: "#app",
    data: { 
        movieDatabase: {},
        actorsDatabase: {},
    }
})
var baseUrl = "http://localhost:3000";
var moviesBaseUrl = "http://localhost:3000/films";
var actorsBaseUrl = "http://localhost:3000/actors";
var castBaseUrl = "http://localhost:3000/cast";

fetch(moviesBaseUrl)
    .then(response => response.json())
    .then(json => {mainElement.movieDatabase = json;})
    .catch(error => console.log(error))

fetch(actorsBaseUrl)
    .then(response => response.json())
    .then(json => {mainElement.actorsDatabase = json})
    .catch(error => console.log(error))