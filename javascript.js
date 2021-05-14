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

//loading a list of movies
axios.get(moviesBaseUrl)
    .then(response => {
        mainElement.movieDatabase = response.data
    })
    .catch(error => console.log(error))     

axios.get(actorsBaseUrl)
    .then(response => {mainElement.actorsDatabase = response.data})
    .catch(error => console.log(error))

