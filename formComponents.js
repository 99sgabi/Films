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
        <div style="width:100%">
        <hr/>
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
            <input type="submit" value="Wyślij">
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
            <input type="submit" value="Wyślij">
        </form>
    </div>
    `
}