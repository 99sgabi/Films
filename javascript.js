var mainElement = new Vue({
    el: "#app",
    data: { 
        movieDatabase: {},
        movieActorsDatabase: [],
        actorsDatabase: {},
        movieTitle: "",
        movieDescription: "",
        movieDateOfRelease: "",
        movieGenere: "",
        movieAvatar: "",
        movieEdited: null,
        roleFilm: "",
        roleActor: "",
        roleName: ""
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
            if(this.movieTitle != "" && this.movieDescription != "" && this.movieGenere !="" && this.movieDateOfRelease != "")
            {
                if(this.movieEdited != null)
                {
                    console.log(this.movieAvatar)
                    axios.put(moviesBaseUrl+ "/" + this.movieEdited.id, {
                            avatar : this.movieAvatar,
                            name: this.movieTitle,
                            description: this.movieDescription,
                            dateOfRelease: this.movieDateOfRelease,
                            genere : this.movieGenere
                        })
                        .then(response => {
                            this.movieEdited = response.data
                            this.movieEdited = null})
                        .then(response => {
                            axios.get(moviesBaseUrl)
                                    .then(moviesResponse =>{
                                        mainElement.movieDatabase = moviesResponse.data;
                                    })
                                    .catch(error => console.log(error))     

                        })
                    
                    console.log("here1")
                    
                }
                else
                {
                    let movie = {
                        avatar : this.movieAvatar,
                        name: this.movieTitle,
                        description: this.movieDescription,
                        dateOfRelease: this.movieDateOfRelease,
                        genere : this.movieGenere
                    }
                    axios.post(moviesBaseUrl, movie)
                        .then(response => this.movieDatabase.push(response.data))
                    
                }
                
            }
            this.movieTitle = ""
            this.movieDescription = "" 
            this.movieGenere =""
            this.movieDateOfRelease = ""
            this.movieAvatar = ""
        },
        addActorToMovie()
        {
            if(this.roleName != "" && this.roleActor != "" && this.roleFilm !="")
            {
                let cast = {
                    role: this.roleName,
                    actorId: this.roleActor.id,
                    filmId: this.roleFilm.id
                }
                console.log(this.roleActor.id)
                console.log(this.roleFilm.id)
                axios.post(castBaseUrl, cast)
                    .then(response => {
                        
                    })
                    .catch(error => console.log(error))
            }
            this.roleName = ""
            this.roleActor = "" 
            this.roleFilm =""
        },
        deleteActor(actor)
        {
            
        },
        deleteMovie(movie)
        {
            axios.delete(moviesBaseUrl + "/" + movie.id)
                .then(response => 
                    {
                        this.movieDatabase.splice(
                            this.movieDatabase.indexOf(movie), 1
                        )
                    })
        },
        deleteActorFromTheMovie(role)
        {
            
        },
        editActor()
        {

        },
        editMovie(movie)
        {
            if(this.movieEdited == null)
            {
                this.movieEdited = movie;
                this.movieTitle = movie.name;
                this.movieDescription = movie.description;
                this.movieGenere = movie.genere;
                this.movieDateOfRelease = movie.dateOfRelease;
                this.movieAvatar = movie.avatar;
            }
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
var castBaseUrl = "http://localhost:3001/cast";
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
