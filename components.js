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
                            <li v-for="role in cast" v-bind:key="role.actorId">
                            {{ role.actor && role.actor.name }}
                            </li>
                        </ul>
                    </div>
                    <div style="float:left;width:10%">
                        <button>
                            Edytuj
                        </button>
                        <br/>
                        <button>
                            Usuń
                        </button>
                    </div>
                </div>`
}//)