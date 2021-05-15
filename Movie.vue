<template>
<div>
    <h1>
        Movie name: {{ movie.name }}
    </h1>
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
</template>

<script>
    export default{
        props: ["movie", "cast"],
    };
</script>

<style>
    h1 {
        color: red;
    }
</style>