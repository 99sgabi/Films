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
            movieDate: "" ,
            viewed: false,
            show: true
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
                    let id =  this.$route.params.id;
                    let roleToSee = role.roleToSee
                    axios.post(castBaseUrl, role.roleToDB)
                        .then(response => {
                            axios.get(movieActorsURL(id))
                                .then(moviesResponse =>{
                                    this.cast = moviesResponse.data;
                                })
                                .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
            }
        },
        setViewed(movie)
        {
            this.viewed = !movie.viewed
            axios.put(moviesBaseUrl+ "/" + movie.id, {
                avatar : movie.avatar,
                name: movie.name,
                description: movie.description,
                dateOfRelease: movie.dateOfRelease,
                genere : movie.genere,
                viewed: this.viewed
            })
            .then(response => {
                this.movie = response.data })
        },
        showForm(){
            this.show = !this.show;
        }
    },
    components: {
        'formE': movieDetailsForm,
        'formCast': actorToMovieForm
    },
    template : `<div v-bind:class="{show: show}" style="top: 30px;">
                    <div class="movie-details">
                        <div style="margin:50px">
                            <img :src="movie.avatar" style="width:80%;"/>
                        </div>
                        <div style="float:left;width:70%">
                            <div>
                                <h1 style="color:blue">
                                    Movie name: {{ movie.name }}
                                </h1>
                                
                            </div>
                            <p>
                                Data: {{ movie.dateOfRelease }}
                            </p>
                            <p>
                                Gatunek: {{ movie.genere }}
                            </p>
                            <ul>
                                <li v-for="role in cast" v-bind:key="(role.actorId + 1)*1000000">
                                {{ role.actor && role.actor.name }}
                                <button v-on:click="deleteActor(role)"> 
                                    Usuń aktora
                                </button>
                                </li>
                            </ul>

                            <div style="float:left;width:10%">

                                <button v-on:click="setViewed(movie)" v-if="!movie.viewed" class="viewed-button">
                                    Obejrzałem
                                </button>
                                <button v-on:click="setViewed(movie)" v-else class="unviewed-button">
                                    Usuń z oglądanych
                                </button>

                                <button v-on:click="showForm()">
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
                        
                    </div>
                    
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
            title: "Edytuj",
            show: true
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
                    let id =  this.$route.params.id;
                    let roleToSee = role.roleToSee;
                    axios.post(castBaseUrl, role.roleToDB)
                        .then(response => {
                            axios.get(actorsMovieURL(id))
                                .then(actorsResponse =>{
                                    this.movies = actorsResponse.data;
                                })
                                .catch(error => console.log(error))
                            //console.log(roleToSee)
                            //this.movies.push(roleToSee)
                        })
                        .catch(error => console.log(error))
                }
            }
        },
        showForm(){
            this.show = !this.show;
        }
    },
    components: {
        'formA': actorDetailsForm,
        'formCast': movieToActorForm,
    },
    template : `<div v-bind:class="{show: show}">
                    <div class="actor-component">
                        <div style="margin:10px;">
                            <div>
                                <h1 style="color:blue">
                                    Actor name: {{ actor.name }}
                                </h1>
                                
                            </div>
                            <p>
                                Opis: {{ actor.description }}
                            </p>
                            <p>
                                Urodzony(a) w: {{ actor.placeOfBirth }}
                            </p>
                            <p>
                                Wzrost: {{ actor.heightCM }}
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
                            <button v-on:click="showForm()">
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
        <div style="display:grid; place-items:center; margin:5px;">
            <img :src="movie.avatar"/>
        </div>
        <div style="margin: 5px;">
            <div>
                <h1 style="color:blue">
                    Nazwa filmu: {{ movie.name }}
                </h1>
                            
            </div>
            <p>
                Data: {{ movie.dateOfRelease }}
            </p>
            <p>
                Gatunek: {{ movie.genere }}
            </p>
            <p>
                Opis: {{ movie.description }}
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
    <div class="list">
        <div>
            <formE :movie="movie" :title="title" v-on:editmovieevent="addMovie"> </formE>
        </div>
        <div v-for="movie in filteredMovies">
                <movie :movie="movie"></movie>
        </div>
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
                category: ""
            }
        }
        
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            axios.get(moviesBaseUrl)
                .then(moviesResponse =>{
                    this.movies = moviesResponse.data;
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
            this.filter = filter;
                /*if(filter.category !="" && filter.category != null)
                    this.movies = this.movies.filter(m => m.genere == filter.category)
                if(filter.word !="")
                    this.movies = this.movies.filter(m => m.name.indexOf(filter.word) != -1)
                if(filter.year !="")
                    this.movies = this.movies.filter(m => parseInt(m.dateOfRelease) == filter.year)

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
                        parseInt(b.dateOfRelease) - parseInt(a.dateOfRelease))*/

        }
    },
    computed: {
        filteredMovies() 
        {
            console.log(this.filter)
            let filter = this.filter;
            let filterMovies = [];
            filterMovies = this.movies;

            if(filter.category !="" && filter.category != null)
                filterMovies = filterMovies.filter(m => m.genere == filter.category)
            if(filter.word !="")
                filterMovies = filterMovies.filter(m => m.name.toLowerCase().indexOf(filter.word.toLowerCase()) != -1)
            if(filter.year !="")
                filterMovies = filterMovies.filter(m => parseInt(m.dateOfRelease) == filter.year)

            if(filter.sort == "Tytuły od A do Z")
                filterMovies.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            else if(filter.sort == "Tytuły od Z do A")
                filterMovies.sort((a, b) =>
                    b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
            else if(filter.sort == "Lata powstania rosnąco")
                filterMovies.sort((a, b) =>
                    parseInt(a.dateOfRelease) - parseInt(b.dateOfRelease))
            else if(filter.sort == "Lata powstania malejąco")
                filterMovies.sort((a, b) =>
                    parseInt(b.dateOfRelease) - parseInt(a.dateOfRelease))

            console.log(filterMovies)
            return filterMovies
            
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
                    Opis: {{ actor.description }}
                </p>
                <p>
                    Urodzony(a) w: {{ actor.placeOfBirth }}
                </p>
                <p>
                    Wzrost: {{ actor.heightCM }}
                </p>
                <p>
                    Rok urodzenia: {{ actor.yearOfBirth }}
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
            },
            filter: {
                word: '',
                year: '',
                sort: null
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
            this.filter = filter;
            /*
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
                        parseInt(b.yearOfBirth) - parseInt(a.yearOfBirth))*/

        }
    },
    computed: {
        filteredActors() 
        {
            console.log(this.filter)
            let filter = this.filter;
            let filterActors = [];
            filterActors = this.actors;


            if(filter.word !="")
                filterActors = filterActors.filter(a => a.name.toLowerCase().indexOf(filter.word.toLowerCase()) != -1)
            if(filter.year !="")
                filterActors = filterActors.filter(a => a.yearOfBirth == filter.year)

                if(filter.sort == "Imiona od A do Z")
                    filterActors.sort((a, b) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                else if(filter.sort == "Imiona od Z do A")
                    filterActors.sort((a, b) =>
                        b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                else if(filter.sort == "Rok urodzenia rosnąco")
                    filterActors.sort((a, b) =>
                        parseInt(a.yearOfBirth) - parseInt(b.yearOfBirth))
                else if(filter.sort == "Rok urodzenia malejąco")
                    filterActors.sort((a, b) =>
                        parseInt(b.yearOfBirth) - parseInt(a.yearOfBirth))

            console.log(filterActors)
            return filterActors
            
        }
    },
    template: `
    <div class="list">
        <div>
            <formA :actor=actor :title="title" v-on:editactorevent="addActor"></formA>
        </div>
        <div>
            <div v-for="actor in filteredActors">
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

let viewedMovieComponent = {
    props: ['movie'],
    template: `
    <div class="viewed-movie-components">
        <div style="margin:5px;">
            <img :src="movie.avatar"/>
        </div>
        <div style="margin: 5px;">
            <div>
                <h1 style="color:blue">
                    Nazwa filmu: {{ movie.name }}
                </h1>
                            
            </div>
            <p>
                Data: {{ movie.dateOfRelease }}
            </p>
            <p>
                Gatunek: {{ movie.genere }}
            </p>
            <p>
                Opis: {{ movie.description }}
            </p>
        </div>
        <div style="position: relative">
            <router-link class="list-button" :to="{ name: 'movie', params: { id: movie.id }}">Szczegoly</router-link>
        </div>
    </div>`
}

let viewedList = 
{
    template: `
    <div class="favourite-list">
        <div v-for="movie in viewedMovies">
                <movie :movie="movie"></movie>
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
                category: ""
            }
        }
        
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            axios.get(moviesBaseUrl)
                .then(moviesResponse =>{
                    this.movies = moviesResponse.data;
                })
                .catch(error => console.log(error));
        },
    },
    computed: {
        viewedMovies() 
        {
            let viewedMovies = [];
            this.movies.forEach(element => {
                if(element.viewed == true){
                    viewedMovies.push(element)
                }
            });

            return viewedMovies
            
        }
    },
    components:
    {
        'movie': viewedMovieComponent,
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
                                Rola: {{ role.role }}
                            </h1>
                            
                        </div>
                        <p>
                            Aktor: {{ role.actorId }}
                        </p>
                        <p>
                            Film: {{ role.filmId }}
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