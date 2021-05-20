//Vue.component('movie', 
let movieComponent = 
{
    props: ["movie", "cast"],
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
    props: ["actor", "movies"],
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