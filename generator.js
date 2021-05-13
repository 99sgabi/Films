actors: lodash.times(100, (n) => {
    return{
       id: n + 1,
       name: faker.name.findName(),
       placeOfBirth: faker.city.cityName(),
       description: faker.lorem.sentences(),
       yearOfBirth: faker.date.year($max = 'now'),
       heightCM: faker.base.numberBetween($min = 150, $max = 210),
     }
});
films: lodash.times(100, (n) => {
    return{
       id: n + 1,
       name: faker.lorem.word(),
       avatar: faker.image.avatar(),
       description: faker.lorem.sentences(),
       dateOfRelease: faker.date.iso8601($max = 'now') ,
       genere: faker.base.randomElement($array = array ('dramat','komedia','romans', 'horror'))
     }
});
cast: lodash.times(100, (n) => {
    return{
       filmId: n + 1,
       actorId: faker.base.numberBetween($min = 0, $max = 100),
       role: faker.name.findName(),
    }
})
//https://github.com/fzaninotto/Faker
//https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Date