var mainElement = new Vue({
    el: "#app",
    data: { 
        movieDatabase: {},
        movieActorsDatabase: [],
        actorsDatabase: {},
    },
    methods: {
        getActors(movieId)
        {
            let filteredElements = this.movieActorsDatabase.filter( function(movieActor){
                return movieActor.filmId == movieId
            })
            return filteredElements
        },
        addActor()
        {

        },
        addMovie()
        {

        },
        addActorToMovie()
        {

        },
        deleteActor()
        {

        },
        deleteMovie()
        {
            
        },
        deleteActorFromTheMovie()
        {
            
        },
        editActor()
        {

        },
        editMovie()
        {

        },
        editRoleOfTheActorInTheMovie()
        {
            
        }
    },
    computed: {
        filteredMovies(nameCriteria, dateCriteria, actorsCriteria, genereCriteria)
        {
            
        }
    },
    components:
    {
        'movie': movieComponent,
    }
})

var baseUrl = "http://localhost:3001";
var moviesBaseUrl = "http://localhost:3001/films";
var actorsBaseUrl = "http://localhost:3001/actors";
var movieActorsURL = (id) => `http://localhost:3001/films/${id}/actors`;
var moviesActorsAllURL = "http://localhost:3001/films/actors";
var actorsMovieURL =  (id) => `http://localhost:3001/actors/${id}/films`;

//loading a list of movies with actors
axios.get(moviesBaseUrl)
    .then(moviesResponse =>{
        mainElement.movieDatabase = moviesResponse.data;
    })
    .catch(error => console.log(error))     

axios.get(moviesActorsAllURL)
    .then(response =>{
        mainElement.movieActorsDatabase = response.data;
    })
    .catch(error => console.log(error))   

axios.get(actorsBaseUrl)
    .then(response => {mainElement.actorsDatabase = response.data})
    .catch(error => console.log(error))
