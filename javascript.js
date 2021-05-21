Vue.use(VueRouter);
const routes =[
    { 
        path: '/movies', 
        component: moviesList, 
        props: (route) => ({
            movies: mainElement.movieDatabase
        })
    },
    { 
        path: '/movies/:id', 
        component: movieComponent, 
        props: true,
        name: 'movie'
    },
    { 
        path: '/actors/:id', 
        component: actorComponent, 
        props: true,
        name: 'actor'
    },
    { 
        path: '/actors', 
        component: actorsList, 
        props: (route) => ({
            actors: mainElement.actorsDatabase
        })
    }
];
const router = new VueRouter({ routes});


var mainElement = new Vue({
    el: "#app",
    router,
    data: { 
        movieDatabase: [],
        movieActorsDatabase: [],
        actorsDatabase: [],
        actorsMoviesDatabase: [],
        movieTitle: "",
        movieDescription: "",
        movieDateOfRelease: "",
        movieGenere: "",
        movieAvatar: "",
        movieEdited: null,
        roleFilm: "",
        roleActor: "",
        roleName: "",
        actorName: "",
        actorPlaceOfBirth: "",
        actorDescription: "",
        actorYearOfBirth: "",
        actorHeightCM: "",
        actorEdited: null,
        roleEdited: null
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
            if(this.actorName != "" && this.actorPlaceOfBirth != "" && this.actorDescription !="" && this.actorYearOfBirth != "" && this.actorHeightCM != "")
            {
                if(this.actorEdited != null)
                {
                    axios.put(actorsBaseUrl+ "/" + this.actorEdited.id, {
                            name: this.actorName,
                            placeOfBirth: this.actorPlaceOfBirth,
                            description: this.actorDescription, 
                            yearOfBirth: this.actorYearOfBirth,
                            heightCM: this.actorHeightCM 
                        })
                        .then(response => {
                            this.actorEdited = response.data
                            this.actorEdited = null})
                        .then(response => {
                            axios.get(actorsBaseUrl)
                                    .then(actorsResponse =>{
                                        mainElement.actorsDatabase = actorsResponse.data;
                                    })
                                    .catch(error => console.log(error))     

                        })
                }
                else
                {
                    let actor = {
                        name: this.actorName,
                        placeOfBirth: this.actorPlaceOfBirth,
                        description: this.actorDescription, 
                        yearOfBirth: this.actorYearOfBirth,
                        heightCM: this.actorHeightCM 
                    }
                    axios.post(actorsBaseUrl, actor)
                        .then(response => this.actorsDatabase.push(response.data))
                    
                }
                
            }
            
            this.actorName = "";
            this.actorPlaceOfBirth = "";
            this.actorDescription = "";
            this.actorYearOfBirth = "";
            this.actorHeightCM = "";
        },
        addMovie()
        {
            if(this.movieTitle != "" && this.movieDescription != "" && this.movieGenere !="" && this.movieDateOfRelease != "")
            {
                if(this.movieEdited != null)
                {
                    axios.put(moviesBaseUrl+ "/" + this.movieEdited.id, {
                            avatar : this.movieAvatar,
                            name: this.movieTitle,
                            description: this.movieDescription,
                            dateOfRelease: new Date(Date.parse(this.movieDateOfRelease)),
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
                }
                else
                {
                    let movie = {
                        avatar : this.movieAvatar,
                        name: this.movieTitle,
                        description: this.movieDescription,
                        dateOfRelease: new Date(Date.parse(this.movieDateOfRelease)),
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
                if(this.roleEdited == null)
                {
                    let cast = {
                        role: this.roleName,
                        actorId: this.roleActor.id,
                        filmId: this.roleFilm.id
                    }
                    let found = false;
                    console.log(this.movieActorsDatabase.length)
                    for(let i = 0; i< this.movieActorsDatabase.length; i ++ )
                    {
                        if(this.movieActorsDatabase[i].actorId == this.roleActor.id && 
                            this.movieActorsDatabase[i].filmId == this.roleFilm.id)
                            {
                                found = true;
                                break;
                            }
                    }
                    if(!found)
                    {
                        console.log(found)
                        axios.post(castBaseUrl, cast)
                            .then(response => {
                                axios.get(moviesActorsAllURL)
                                .then(response =>{
                                    mainElement.movieActorsDatabase = response.data;
                                })
                                .catch(error => console.log(error))     
                        })
                        .catch(error => console.log(error))
                    }
                        
                    
                }
                else
                {
                    let role = {
                        role: this.roleName,
                        actorId: this.roleActor.id,
                        filmId: this.roleFilm.id
                    }
                    axios.put(castBaseUrl + "/" + this.roleEdited.id, role)
                        .then(response => {
                            axios.get(moviesActorsAllURL)
                            .then(response =>{
                                mainElement.movieActorsDatabase = response.data;
                            })     
                        })
                        .then(response => {
                            axios.get(actorsMoviesAllURL)
                            .then(response =>{
                                mainElement.actorsMoviesDatabase = response.data;
                            })     
                        })
                        .catch(error => console.log(error))
                }
            }
            this.roleName = ""
            this.roleActor = "" 
            this.roleFilm =""
        },
        deleteActor(actor)
        {
            /*let listOfRoles = this.movieActorsDatabase.filter( function(movieActor){
                return movieActor.actorId == actor.id
            });*/

            axios.delete(actorsBaseUrl + "/" + actor.id)
                .then(response => 
                    {
                        this.actorsDatabase.splice(
                            this.actorsDatabase.indexOf(actor), 1
                        )
                    })
                /*.then(response => {
                    for(let role of listOfRoles)
                    {
                        axios.delete(castBaseUrl + "/" + role.id)
                        .then(response => {
                                this.movieActorsDatabase.splice(
                                    this.movieActorsDatabase.indexOf(role), 1
                                )
                        })
                    }
                })
                .then(response => {
                    axios.get(actorsMoviesAllURL)
                        .then(response => {mainElement.actorsMoviesDatabase = response.data})
                        .catch(error => console.log(error))
                })*/
        },
        deleteMovie(movie)
        {
           /* let listOfRoles = this.movieActorsDatabase.filter( function(movieActor){
                return movieActor.filmId == movie.id
            });*/

            axios.delete(moviesBaseUrl + "/" + movie.id)
                .then(response => 
                    {
                        this.movieDatabase.splice(
                            this.movieDatabase.indexOf(movie), 1
                        )
                    })
               /* .then(response => {
                    for(let role of listOfRoles)
                    {
                        axios.delete(castBaseUrl + "/" + role.id)
                        .then(response => {
                                this.movieActorsDatabase.splice(
                                    this.movieActorsDatabase.indexOf(role), 1
                                )
                        })
                    }
                })
                .then(response => {
                    axios.get(actorsMoviesAllURL)
                        .then(response => {mainElement.actorsMoviesDatabase = response.data})
                        .catch(error => console.log(error))
                })*/
        },
        deleteActorFromTheMovie(role)
        {
            axios.delete(castBaseUrl + "/" + role.id)
                .then(response => {
                    this.movieActorsDatabase.splice(
                        this.movieActorsDatabase.indexOf(role), 1
                    )
                })
                .then(response => {
                    axios.get(actorsMoviesAllURL)
                        .then(response => {mainElement.actorsMoviesDatabase = response.data})
                        .catch(error => console.log(error))
                })
        },
        editActor(actor)
        {
            if(this.actorEdited == null)
            {
                this.actorEdited = actor;
                this.actorName = actor.name;
                this.actorPlaceOfBirth = actor.placeOfBirth;
                this.actorDescription = actor.description;
                this.actorYearOfBirth = actor.yearOfBirth;
                this.actorHeightCM = actor.heightCM;
            }
        },
        editMovie(movie)
        {
            if(this.movieEdited == null)
            {
                let dateOfRelease = new Date(Date.parse(movie.dateOfRelease));
                let y = dateOfRelease.getFullYear();
                let m = dateOfRelease.getMonth() < 10 ? "0" + dateOfRelease.getMonth() : dateOfRelease.getMonth();
                let d = dateOfRelease.getDate() < 10 ? "0" + dateOfRelease.getDate() : dateOfRelease.getDate();
                this.movieEdited = movie;
                this.movieTitle = movie.name;
                this.movieDescription = movie.description;
                this.movieGenere = movie.genere;
                this.movieDateOfRelease = `${y}-${m}-${d}`;
                this.movieAvatar = movie.avatar;
            }
        },
        editRoleOfTheActorInTheMovie(role)
        {
            if(this.roleEdited == null)
            {
                this.roleEdited = role;
                this.roleName = role.role;
                this.roleActor = this.actorsDatabase.filter( function(actor){
                    return actor.id == role.actorId
                })[0]
                this.roleFilm = this.movieDatabase.filter( function(movie){
                    return movie.id == role.filmId
                })[0]
            }
        }
    },
    computed: {
        filteredMovies(nameCriteria, dateCriteria, actorsCriteria, genereCriteria)
        {
            
        },
        movie() {
            return movieId => this.movieActorsDatabase.filter( function(movieActor){
                return movieDatabase.filmId == movieId
            })
        },
        movieActors() {
            return movieId => this.movieActorsDatabase.filter( function(movieActor){
                return movieActor.filmId == movieId
            })
        },
        actorsMovies() {
            return actorId => this.actorsMoviesDatabase.filter(function(movieActor){
                return movieActor.actorId == actorId
            })
        }
    }, 
    components:
    {
        'movie': movieComponent,
        'actor': actorComponent,
        'role': roleComponent
    }
})

var baseUrl = "http://localhost:3001";
var moviesBaseUrl = "http://localhost:3001/films";
var actorsBaseUrl = "http://localhost:3001/actors";
var castBaseUrl = "http://localhost:3001/cast";
var movieActorsURL = (id) => `http://localhost:3001/films/${id}/actors`;
var moviesActorsAllURL = "http://localhost:3001/films/actors";
var actorsMoviesAllURL = "http://localhost:3001/actors/films";
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

axios.get(actorsMoviesAllURL)
    .then(response => {mainElement.actorsMoviesDatabase = response.data})
    .catch(error => console.log(error))
