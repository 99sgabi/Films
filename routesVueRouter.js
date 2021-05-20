/*const movies = 
{
    props: ["movies"],
    template: `
    <h1>Filmy:</h1>
    <movie v-for="movie in movies" :key="(movie.id + 1)*100000000" :movie="movie" :cast="movieActors(movie.id)" 
        v-on:delete="deleteMovie" v-on:edit="editMovie" :movieEdited="movieEdited">
    </movie>
    `
}
const routes = [
    { path: '/', component: movies, props: mainElement.moviesDatabase },
    { path: '/actors', component: mainElement.actors }
]

const router =  new VueRouter({
    routes,
})*/