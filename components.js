//Vue.component('movie', 
var baseUrl = "http://localhost:3001";
var moviesBaseUrl = "http://localhost:3001/films";
var actorsBaseUrl = "http://localhost:3001/actors";
var castBaseUrl = "http://localhost:3001/cast";
var movieActorsURL = (id) => `http://localhost:3001/films/${id}/actors`;
var moviesActorsAllURL = "http://localhost:3001/films/actors";
var actorsMoviesAllURL = "http://localhost:3001/actors/films";
var actorsMovieURL =  (id) => `http://localhost:3001/actors/${id}/films`;


let movieComponent = 
{
    data() {
        return {
            movie: "",    
            cast: ""  
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
        }
    },
    template : `<div style="display: flex">
                    <div style="width: 20%;float:left">
                            <img style="width:100%" :src="movie.avatar"/>
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
                            </li>
                        </ul>
                    </div>
                    <div style="float:left;width:10%">
                        <button v-on:click="$emit('edit', movie)">
                            Edytuj
                        </button>
                        <br/>
                        <button v-on:click="$emit('delete', movie)">
                            Usuń
                        </button>
                    </div>
                </div>`
}//)

let actorComponent = 
{
    data() {
        return {
            actor: "",    
            movies: ""  
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
        }
    },
    template : `<div style="display: flex">
                    <div style="float:left;width:90%">
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
                            </li>
                        </ul>
                    </div>
                    <div style="float:left;width:10%">
                        <button v-on:click="$emit('edit', actor)">
                            Edytuj
                        </button>
                        <br/>
                        <button v-on:click="$emit('delete', actor)">
                            Usuń
                        </button>
                    </div>
                </div>`
}

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

let movieBasicComponent = {
    props: ['movie'],
    template: `
    <div style="display: flex">
        <div style="width: 20%;float:left">
            <img style="width:100%" :src="movie.avatar"/>
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
            <p>
                Description: {{ movie.description }}
            </p>
        </div>
        <div style="float:left;width:10%">
            <button>
            <router-link :to="{ name: 'movie', params: { id: movie.id }}">Szczegoly</router-link>
            </button>
        </div>
    </div>`
}

let moviesList = 
{
    props : ['movies'],
    template: `
    <div>
    <h1>Filmy:</h1>
            <div v-for="movie in movies">
               <movie :movie="movie"></movie>
            </div>
    </div>
    `,
    components:
    {
        'movie': movieBasicComponent,
    }
}

let actorBasicComponent = {
    props: ['actor'],
    template: `
    <div style="display: flex">
        <div style="float:left;width:90%">
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
        <div style="float:left;width:10%">
            <button>
                <router-link :to="{ name: 'actor', params: { id: actor.id }}">Szczegoly</router-link>
            </button>
        </div>
    </div>`
}


let actorsList = 
{
    props : ['actors'],
    template: `
    <div>
    <h1>Aktorzy:</h1>
        <div>
            <div v-for="actor in actors">
                <actor :actor="actor"></actor> 
            </div>
        </div>
    </div>
    `,
    components:
    {
        'actor': actorBasicComponent,
    }
}