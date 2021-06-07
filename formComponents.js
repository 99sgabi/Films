var actorsUrl = "http://localhost:3001/actors";
var moviesUrl = "http://localhost:3001/films";

let movieForm = {
    props: ['title', 'movie'],
    methods: {
        edit()
        {
            this.$props.movie.dateOfRelease = new Date(Date.parse(this.movieDate));
            this.$emit('editmovieevent', this.$props.movie)
        }
    },
    computed: {
        movieDate: {
            // getter
            get: function () {
                let dateOfRelease = new Date(Date.parse(this.$props.movie.dateOfRelease));
                let y = dateOfRelease.getFullYear();
                let m = dateOfRelease.getMonth() + 1 < 10 ? "0" + (dateOfRelease.getMonth() + 1) : (dateOfRelease.getMonth() + 1);
                let d = dateOfRelease.getDate() < 10 ? "0" + dateOfRelease.getDate() : dateOfRelease.getDate();
                return `${y}-${m}-${d}`
            },
            // setter
            set: function (newValue) {
                this.$props.movie.dateOfRelease = new Date(Date.parse(newValue));
            }
        }
    },
    template: `
        <div class="form">
        <h1>{{ title }}:</h1>

        <form v-on:submit.prevent="edit">
            <label>
                Tytuł:
            </label><br/>
            <input v-model="movie.name">
            <br/>
            <label>
                Opis:
            </label>
            <br/>
            <textarea v-model="movie.description"></textarea>
            <br/>
            <label>
                Data:
            </label>
            <br/>
            <input type="date" v-model="movieDate">
            <br/>
            <label>
                Gatunek:
            </label>
            <br/>
            <select v-model="movie.genere">
                <option>komedia</option>
                <option>romans</option>
                <option>horror</option>
                <option>dramat</option>
            </select>   
            <br/>
            <label>
                Url do plakatu:
            </label><br/>
            <input type="url" v-model="movie.avatar">
            <br/>
            <input type="submit" class="button" value="Wyślij">
        </form>
    </div>
    `
}


let actorForm = {
    props: ['title', 'actor'],
    methods: {
        edit()
        {
            this.$emit('editactorevent', this.$props.actor)
        }
    },
    template: `
    <div class="form">
        <div>
            <h1>{{title}}</h1>
            <form v-on:submit.prevent="edit">
                <label>
                    Imię aktora:
                </label><br/>
                <input v-model="actor.name">
                <br/>
                <label>
                    Opis:
                </label>
                <br/>
                <textarea v-model="actor.description"></textarea>
                <br/>
                <label>
                    Rok urodzenia:
                </label>
                <br/>
                <input type="number" v-model="actor.yearOfBirth">
                <br/>
                <label>
                    Miejsce urodzenia:
                </label><br/>
                <input v-model="actor.placeOfBirth">
                <br/>
                <label>
                    Wzrost:
                </label>
                <br/>
                <input type="number" v-model="actor.heightCM">
                <br/>
                <input type="submit" class="button" value="Wyślij">
            </form>
        </div>
    </div>
    `
}
let actorDetailsForm = {
    props: ['title', 'actor'],
    methods: {
        edit()
        {
            this.$emit('editactorevent', this.$props.actor)
        }
    },
    template: `
    <div style="
        position:absolute;
        overflow: hidden;
        top:70px;
        right:10px;
    ">
        <div class="actor-form">
            <h1>{{title}}</h1>
            <form v-on:submit.prevent="edit">
                <label>
                    Imię aktora:
                </label><br/>
                <input v-model="actor.name">
                <br/>
                <label>
                    Opis:
                </label>
                <br/>
                <textarea v-model="actor.description"></textarea>
                <br/>
                <label>
                    Rok urodzenia:
                </label>
                <br/>
                <input type="number" v-model="actor.yearOfBirth">
                <br/>
                <label>
                    Miejsce urodzenia:
                </label><br/>
                <input v-model="actor.placeOfBirth">
                <br/>
                <label>
                    Wzrost:
                </label>
                <br/>
                <input type="number" v-model="actor.heightCM">
                <br/>
                <input type="submit" class="button" value="Wyślij">
            </form>
        </div>
    </div>
    `
}


let actorToMovieForm = {
    props: ["movieId"],
    data() {
        return {
            actors: {},
            role: {
                filmId: -1,
                actorId: -1,
                actor: {},
                role: ""
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            axios.get(actorsUrl)
                .then(response =>{
                    this.actors = response.data;
                    this.role.filmId = this.$props.movieId;
                })
                .catch(error => console.log(error));
        },
        addActor()
        {
            this.role.actorId = this.role.actor.id
            let roleToEmit = {
                filmId: this.$props.movieId,
                actorId: this.role.actor.id,
                role:  this.role.role
            }
            this.$emit('addrole', roleToEmit)
            this.role =  {
                filmId: -1,
                actorId: -1,
                actor: {},
                role: ""
            }
        }
    },
    template: `
            <div class="form">
                <h1>Dodaj aktora:</h1>
                <form v-on:submit.prevent="addActor">
                    <label>
                        Rola:
                    </label><br/>
                    <input v-model="role.role">
                    <br/>
                    <label>
                        Aktor:
                    </label>
                    <select v-model="role.actor">
                        <option v-for="actor in actors" :value="actor">{{ actor.name }}</option>
                    </select>   
                    <br/>
                    
                    <br/>
                    <input type="submit" value="Wyślij">
                </form>
            </div>`
};


let movieToActorForm = {
    props: ["actorId"],
    data() {
        return {
            movies: {},
            role: {
                filmId: -1,
                actorId: -1,
                actor: {},
                role: ""
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData()
        {
            axios.get(moviesUrl)
                .then(response =>{
                    this.movies = response.data;
                    this.role.actorId = this.$props.actorId;
                })
                .catch(error => console.log(error));
        },
        addMovie()
        {
            this.role.filmId = this.role.film.id
            let roleToEmit = {
                actorId: this.$props.actorId,
                filmId: this.role.film.id,
                role:  this.role.role
            }

            let item = {
                roleToDB: roleToEmit,
                roleToSee:{
                    actorId: this.$props.actorId,
                    filmId: this.role.film.id,
                    role:  this.role.role,
                    film: this.role.film
                }
            }
            this.$emit('addrole', item)
            this.role =  {
                filmId: -1,
                actorId: -1,
                actor: {},
                role: ""
            }
        }
    },
    template: `
            <div class="role-form">
                <h1>Dodaj role:</h1>
                <form v-on:submit.prevent="addMovie">
                    <label>
                        Rola:
                    </label><br/>
                    <input v-model="role.role">
                    <br/>
                    <label>
                        Film:
                    </label>
                    <select v-model="role.film">
                        <option v-for="movie in movies" v-bind:value="movie">{{ movie.name }}</option>
                    </select>   
                    <br/>
                    
                    <br/>
                    <button type="submit" value="Wyślij">Dodaj role</button>
                </form>
            </div>`
};


let filterForm = {
    
  data() {
      return {
            word: '',
            year: '',
            sort: null,
            category: null
      }
  },
  methods: {
      onSubmit() {
          let filter = {
              word: this.word,
              year: this.year,
              sort: this.sort,
              category: this.category
          }
          this.$emit('filter-submitted', filter)
      }

  },
  template:
    `<form class="filter-form" @submit.prevent="onSubmit">
    <h3>Filtrowanie</h3>

    <label for="word">Tytuł filmu </label>
    <input id="word" v-model="word">

    <br>
    <label for="year">Rok powstania </label>
    <input type="number" id="year" v-model="year">

    <br>
    <label for="category">Gatunek</label>
    <select id="category" v-model="category">
      <option></option>
      <option>komedia</option>
      <option>romans</option>
      <option>horror</option>
      <option>dramat</option>
    </select>

    <br>
    <label for="sort">Sortowanie:</label>
    <select id="sort" v-model="sort">
      <option>Tytuły od A do Z</option>
      <option>Tytuły od Z do A</option>
      <option>Lata powstania rosnąco</option>
      <option>Lata powstania malejąco</option>
    </select>

    <br>
    <input class="button" type="submit" value="Filtruj">
  </form>`

};

let filterActorsForm = {
    
  data() {
      return {
            word: '',
            year: '',
            sort: null
      }
  },
  methods: {
      onSubmit() {
          let filter = {
              word: this.word,
              year: this.year,
              sort: this.sort
          }
          this.$emit('filter-submitted', filter)
      }

  },
  template:
    `<form class="filter-actors-form" @submit.prevent="onSubmit">
    <h3>Filtrowanie</h3>
    <label for="word">Imie aktora </label>
    <input id="word" v-model="word">

    <br>
    <label for="year">Rok urodzenia </label>
    <input type="number" id="year" v-model="year">

    <br>
    <label for="sort">Sortowanie:</label>
    <select id="sort" v-model="sort">
      <option>Imiona od A do Z</option>
      <option>Imiona od Z do A</option>
      <option>Rok urodzenia rosnąco</option>
      <option>Rok urodzenia malejąco</option>
    </select>

    <br>
    <input class="button" type="submit" value="Filtruj">
  </form>`

};