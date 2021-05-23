module.exports = function(){
	var faker = require("faker");
	var lodash = require("lodash");
	return{
		actors: lodash.times(101, (n) => {
			return{
			id: n,
			name: faker.name.findName(),
			placeOfBirth: faker.address.city(),
			description: faker.lorem.sentences(),
			yearOfBirth: faker.datatype.number({
					'min': 1900,
					'max': 2014
				}),
			heightCM: faker.datatype.number({
					'min': 150,
					'max': 210
				}),
			}
		}),
		films: lodash.times(101, (n) => {
			return{
			id: n,
			name: faker.lorem.word(),
			avatar: faker.image.image(),
			description: faker.lorem.sentences(),
			dateOfRelease: faker.date.past() ,
			genere: faker.helpers.randomize(['dramat','komedia','romans', 'horror'])
			}
		}),
		cast: lodash.times(198, (n) => {
			let aId = faker.datatype.number({
				'min': 0,
				'max': 50
			})
			return{
				id: n,
					filmId: Math.floor((n+1)/2),
					actorId: n%2 == 0 ? 2*aId : 2*aId + 1 ,
				role: faker.name.findName(),
			}
		})
	}
}

//https://github.com/fzaninotto/Faker
//https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Date
//https://egghead.io/lessons/javascript-creating-demo-apis-with-json-server
//https://www.npmjs.com/package/json-server
//https://github.com/marak/Faker.js/
//https://www.npmjs.com/package/json-server-relationship#relationships