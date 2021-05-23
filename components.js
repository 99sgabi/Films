//-------------------------------------------------------------------------------------------------------------------->Linki
var baseUrl = "http://localhost:3001";
var moviesBaseUrl = "http://localhost:3001/films";
var actorsBaseUrl = "http://localhost:3001/actors";
var castBaseUrl = "http://localhost:3001/cast";
var movieActorsURL = (id) => `http://localhost:3001/films/${id}/actors`;
var moviesActorsAllURL = "http://localhost:3001/films/actors";
var actorsMoviesAllURL = "http://localhost:3001/actors/films";
var actorsMovieURL =  (id) => `http://localhost:3001/actors/${id}/films`;
//var moviesFilterURL = (word,category,sort) => `http://localhost:3001/films/word=${word}/category=${category}/sort=${sort}`;
var moviesFilterURL = (word) => `http://localhost:3001/films/word=${word}`;

//-------------------------------------------------------------------------------------------------------------------> Szczegoly Filmu
//-------------------------------------------------------------------------------------------------------------------> Szczegoly Filmu
let movieComponent = 
{
    data() {
        return {
            movie: "",    
            cast: "",
            title: "Edytuj",
            movieDate: ""  
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            let id =  this.$route.params.id;
            axios.get(moviesBaseUrl + "/" + id)
                .then(moviesResponse =>{
                    this.movie = moviesResponse.data;
                })
                .catch(error => console.log(error));
            axios.get(movieActorsURL(id))
                .then(moviesResponse =>{
                    this.cast = moviesResponse.data;
                })
                .catch(error => console.log(error))
        },
        deleteMovie(movie)
        {
            axios.delete(moviesBaseUrl + "/" + movie.id)
                .then(response => { })
            this.$router.push({name: "moviesList"});
        },
        deleteActor(role)
        {
            axios.delete(castBaseUrl + "/" + role.id)
                .then(response => {
                    this.cast.splice(
                        this.cast.indexOf(role), 1
                    )
                })
        },
        editMovie(movie)
        {   
            axios.put(moviesBaseUrl+ "/" + movie.id, {
                avatar : movie.avatar,
                name: movie.name,
                description: movie.description,
                dateOfRelease: movie.dateOfRelease,
                genere : movie.genere
            })
            .then(response => {
                this.movie = response.data })
        },
        addActorToMovie(role)
        {
            if(role.role != "" && role.actorId != -1)
            {
                let found = false;
                for(let i = 0; i< this.cast.length; i ++ )
                {
                    if(this.cast[i].actorId == role.actorId)
                    {
                        found = true;
                        break;
                    }
                }
                if(!found)
                {
                    axios.post(castBaseUrl, role)
                        .then(response => {
                            console.log(response.data)
                            this.cast.push(response.data)
                        })
                        .catch(error => console.log(error))
                }
            }
        }
    },
    components: {
        'formE': movieForm,
        'formCast': actorToMovieForm
    },
    template : `<div style="top: 30px;">
                    <div class="movie-details">
                        <div style="margin:50px">
                            <img :src="movie.avatar"/>
                        </div>
                        <div style="float:left;width:70%">
                            <div>
                                <h1 style="color:blue">
                                    Movie name: {{ movie.name }}
                                </h1>
                                
                            </div>
                            <p>
                                Date: {{ movie.dateOfRelease }}
                            </p>
                            <p>
                                Genere: {{ movie.genere }}
                            </p>
                            <ul>
                                <li v-for="role in cast" v-bind:key="(role.actorId + 1)*1000000">
                                {{ role.actor && role.actor.name }}
                                <button v-on:click="deleteActor(role)"> 
                                    Usuń aktora
                                </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style="float:left;width:10%">
                        <button v-on:click="$emit('editmovieevent', movie)">
                            Edytuj
                        </button>
                        <br/>
                        <button v-on:click="deleteMovie(movie)">
                            Usuń
                        </button>
                    </div>
                    
                </div>
                <formE :movie="movie" :title="title" v-on:editmovieevent="editMovie"> </formE>
                <formCast :movieId="movie.id" v-on:addrole="addActorToMovie"></formCast>
                </div>`
}//)



//---------------------------------------------------------------------------------------------------------------> Szczegoly Aktorow
//---------------------------------------------------------------------------------------------------------------> Szczegoly Aktorow
let actorComponent = 
{
    data() {
        return {
            actor: "",    
            movies: "",
            title: "Edytuj"  
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            let id =  this.$route.params.id;
            axios.get(actorsBaseUrl + "/" + id)
                .then(actorsResponse =>{
                    this.actor = actorsResponse.data;
                })
                .catch(error => console.log(error));
            axios.get(actorsMovieURL(id))
                .then(actorsResponse =>{
                    this.movies = actorsResponse.data;
                })
                .catch(error => console.log(error))
        },
        deleteActor(actor)
        {
            axios.delete(actorsBaseUrl + "/" + actor.id)
                .then(response => {})
            this.$router.push({name: "actorsList"});
        },
        deleteMovie(role)
        {
            axios.delete(castBaseUrl + "/" + role.id)
                .then(response => {
                    this.movies.splice(
                        this.movies.indexOf(role), 1
                    )
                })
        },
        editActor(actorE)
        {
            axios.put(actorsBaseUrl+ "/" + this.actor.id, {
                name: actorE.name,
                placeOfBirth: actorE.placeOfBirth,
                description: actorE.description, 
                yearOfBirth: actorE.yearOfBirth,
                heightCM: actorE.heightCM 
            })
            .then(response => {
                this.actor = response.data })
        },
        addMovieToActor(role)
        {
            if(role.role != "" && role.filmId != -1)
            {
                let found = false;
                for(let i = 0; i< this.movies.length; i ++ )
                {
                    if(this.movies[i].filmId == role.filmId)
                    {
                        found = true;
                        break;
                    }
                }
                if(!found)
                {
                    axios.post(castBaseUrl, role)
                        .then(response => {
                            console.log(response.data)
                            this.movies.push(response.data)
                        })
                        .catch(error => console.log(error))
                }
            }
        }
    },
    components: {
        'formA': actorForm,
        'formCast': movieToActorForm,
    },
    template : `<div>
                <div class="actor-components-List">
                    <div style="margin:10px;">
                        <div>
                            <h1 style="color:blue">
                                Actor name: {{ actor.name }}
                            </h1>
                            
                        </div>
                        <p>
                            Description: {{ actor.description }}
                        </p>
                        <p>
                            Place Of Birth: {{ actor.placeOfBirth }}
                        </p>
                        <p>
                            height: {{ actor.heightCM }}
                        </p>
                        <ul>
                            <li v-for="movie in movies" v-bind:key="(movie.filmId + 1)*1000">
                            {{ movie.film && movie.film.name }}
                            <button v-on:click="deleteMovie(movie)"> 
                                Usuń film
                            </button>
                            </li>
                        </ul>
                    </div>
                    <div style="margin:10px;">
                        <button v-on:click="$emit('editActorEvent', actor)">
                            Edytuj
                        </button>
                        <br/>
                        <button v-on:click="deleteActor(actor)">
                            Usuń
                        </button>
                    </div>
                 </div>
                    
                <formA :actor="actor" :title="title" v-on:editactorevent="editActor"> </formA>
                <formCast :actorId="actor.id" v-on:addrole="addMovieToActor"></formCast>
                </div>`
}


//--------------------------------------------------------------------------------------------------------------> Element Listy Filmów
//--------------------------------------------------------------------------------------------------------------> Element Listy Filmów
let movieBasicComponent = {
    props: ['movie'],
    template: `
    <div class="movie-components-List">
        <div style="margin:5px;">
            <img :src="movie.avatar"/>
        </div>
        <div style="margin: 5px;">
            <div>
                <h1 style="color:blue">
                    Movie name: {{ movie.name }}
                </h1>
                            
            </div>
            <p>
                Date: {{ movie.dateOfRelease }}
            </p>
            <p>
                Genere: {{ movie.genere }}
            </p>
            <p>
                Description: {{ movie.description }}
            </p>
        </div>
        <div style="position: relative">
            <router-link class="list-button" :to="{ name: 'movie', params: { id: movie.id }}">Szczegoly</router-link>
        </div>
    </div>`
}


//-------------------------------------------------------------------------------------------------------------------> Lista Filmow
//-------------------------------------------------------------------------------------------------------------------> Lista Filmow
let moviesList = 
{
    template: `
    <div >
        <div>
            <formE :movie="movie" :title="title" v-on:editmovieevent="addMovie"> </formE>
        </div>
        <div v-for="movie in filteredMovies">
                <movie :movie="movie"></movie>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div>
        <formF @filter-submitted="filtration"></formF>
        </div>
    </div>
    `,
    data(){
        return {
            movies: [],
            title: "Dodaj Film",
            movie: {                
                avatar : "",
                name: "",
                description: "",
                dateOfRelease: Date.now(),
                genere : ""
            },
            filter: {
                word: '',
                year: '',
                sort: null,
                category: "romans"
            }
        }
        
    },
    created() {
        
        this.fetchData();
        console.log(this.movies)
    },
    methods: {
        fetchData()
        {
            axios.get(moviesBaseUrl)
                .then(moviesResponse =>{
                    this.movies = moviesResponse.data;
                    console.log(this.movies)
                })
                .catch(error => console.log(error));
        },
        addMovie(movie)
        {
            if(movie.name != "" && movie.description != "" && movie.genere !="" && movie.dateOfRelease != "")
            {
                axios.post(moviesBaseUrl, movie)
                    .then(response => this.movies.push(response.data))
            }
            movie = this.movie;
        },
        filtration(filter)
        {
            //FILTEROWANIE I SORTOWANIE
                /*if(filter.category !="" && filter.category != null)
                    this.movies = this.movies.filter(m => m.genere == filter.category)
                if(filter.word !="")
                    this.movies = this.movies.filter(m => m.name.indexOf(filter.word) != -1)
                if(filter.year !="")
                    this.movies = this.movies.filter(m => parseInt(m.dateOfRelease) == filter.year)
*/
            this.filter = filter;
            console.log(this.filter)

                if(filter.sort == "Tytuły od A do Z")
                    this.movies.sort((a, b) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                else if(filter.sort == "Tytuły od Z do A")
                    this.movies.sort((a, b) =>
                        b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                else if(filter.sort == "Lata powstania rosnąco")
                    this.movies.sort((a, b) =>
                        parseInt(a.dateOfRelease) - parseInt(b.dateOfRelease))
                else if(filter.sort == "Lata powstania malejąco")
                    this.movies.sort((a, b) =>
                        parseInt(b.dateOfRelease) - parseInt(a.dateOfRelease))

        }
    },
    computed: {
        //próba filtrowania w computed - nie wiem jak to wywołać
        filteredMovies() 
        {
            console.log(this.filter.word)
            let filter = this.filter;
            return this.movies.filter(function(m) {return m.genere == filter.category})
            //return filter => this.movies.filter(function(m) {return m.genere == filter.category && m.name.indexOf(filter.word) != -1 && m.dateOfRelease == filter.year})
                
        }
    },
    components:
    {
        'movie': movieBasicComponent,
        'formE': movieForm,
        'formF': filterForm
    }
}

//---------------------------------------------------------------------------------------------------------------> Element Listy Akorów
//---------------------------------------------------------------------------------------------------------------> Element Listy Akorów
let actorBasicComponent = {
    props: ['actor'],
    template: `
    <div class="actor-components-List">
        <div style="margin:10px;">
            <div>
                <h1 style="color:blue">
                    Movie name: {{ actor.name }}
                </h1>
                            
            </div>
                <p>
                    Description: {{ actor.description }}
                </p>
                <p>
                    Place Of Birth: {{ actor.placeOfBirth }}
                </p>
                <p>
                    height: {{ actor.heightCM }}
                </p>
                <p>
                    yearOfBirth: {{ actor.yearOfBirth }}
                </p> 
        </div>
        <div style="margin:10px; position: relative">
            <router-link class="list-button" :to="{ name: 'actor', params: { id: actor.id }}">Szczegoly</router-link>
        </div>
    </div>`
}


//-------------------------------------------------------------------------------------------------------------------> Lista Aktorów
//-------------------------------------------------------------------------------------------------------------------> Lista Aktorów
let actorsList = 
{
    data(){
        return {
            actors: "",
            title: "Dodaj Aktora",
            actor: {
                name: "",
                placeOfBirth: "",
                description: "", 
                yearOfBirth: 1990,
                heightCM: 150 
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            axios.get(actorsBaseUrl)
                .then(actorsResponse =>{
                    this.actors = actorsResponse.data;
                })
                .catch(error => console.log(error));
        },
        addActor(actor)
        {
            if(actor.name != "" && actor.placeOfBirth != "" && actor.description !="" && actor.yearOfBirth != "" && actor.heightCM != "")
            {
                axios.post(actorsBaseUrl, actor)
                    .then(response => this.actors.push(response.data))
            }
        },
        filtration(filter)
        {
            console.log(filter)
            //FILTEROWANIE I SORTOWANIE
            
                if(filter.word !="")
                    this.actors = this.actors.filter(a => a.name.indexOf(filter.word) != -1)
                if(filter.year !="")
                    this.actors = this.actors.filter(a => a.yearOfBirth == filter.year)

                if(filter.sort == "Imiona od A do Z")
                    this.actors.sort((a, b) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                else if(filter.sort == "Imiona od Z do A")
                    this.actors.sort((a, b) =>
                        b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                else if(filter.sort == "Rok urodzenia rosnąco")
                    this.actors.sort((a, b) =>
                        parseInt(a.yearOfBirth) - parseInt(b.yearOfBirth))
                else if(filter.sort == "Rok urodzenia malejąco")
                    this.actors.sort((a, b) =>
                        parseInt(b.yearOfBirth) - parseInt(a.yearOfBirth))

        }
    },
    template: `
    <div>
        <div style="display:flex">
            <formA :actor=actor :title="title" v-on:editactorevent="addActor">
            </formA>
        </div>
        <div>
            <div v-for="actor in actors">
                <actor :actor="actor"></actor> 
            </div>
        </div>
        <div>
        <formF @filter-submitted="filtration"></formF>
        </div>
    </div>
    `,
    components:
    {
        'actor': actorBasicComponent,
        'formA': actorForm,
        'formF': filterActorsForm
    }
}


//--------------------------------------------------------------------------------------------------------------------------------> Role
//--------------------------------------------------------------------------------------------------------------------------------> Role
let roleComponent = {
    props: ["role"],
    template : `<div style="display: flex">
                    <div style="float:left;width:90%">
                        <div>
                            <h1 style="color:blue">
                                Role name: {{ role.role }}
                            </h1>
                            
                        </div>
                        <p>
                            Actor: {{ role.actorId }}
                        </p>
                        <p>
                            Movie: {{ role.filmId }}
                        </p>
                    </div>
                    <div style="float:left;width:10%">
                        <button v-on:click="$emit('edit', role)">
                            Edytuj
                        </button>
                        <br/>
                        <button v-on:click="$emit('delete', role)">
                            Usuń
                        </button>
                    </div>
                </div>`
}