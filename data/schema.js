const axios = require('axios');
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql');

// This calls for an environment variable that contains your Petfinder key. You can either replace this with a string
// that contains your petfinder key or set it as an environment variable on the machine you are running the server on.
var petfinderKey = process.env.petfinder_key ;
var baseUrl = 'https://api.petfinder.com/';

var randomPetUrl = baseUrl + 'pet.getRandom';
var breedListUrl = baseUrl + 'breed.list';
var petUrl = baseUrl + 'pet.get';
var petFindUrl = baseUrl + 'pet.find'
var shelterUrl = baseUrl + 'shelter.get';
var shelterFindUrl = baseUrl + 'shelter.find';
var shelterGetPetsUrl = baseUrl + 'shelter.getPets';
var shelterListByBreedUrl = baseUrl + 'shelter.listByBreed';

const PetType = require('./types/pet_type');
const BreedType = require('./types/breed_type');
const ShelterType = require('./types/shelter_type');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      breedList: {
        type: new GraphQLList(BreedType),
        description: "Returns a list of breeds for specified types of animals. See animal argument for possible values.\r\rRequired argument - animal",
        args: { 
          animal: { 
            type: new GraphQLNonNull(GraphQLString),
            description: "--Required--\r\rThe type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]"
          },
        },
        resolve: (root, args) => axios.get(breedListUrl, {
          params: {
            key: petfinderKey,
            animal: args.animal,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.breeds.breed;
        })
      },
      
      pet: {
        type: PetType,
        description: "Returns a single pet. \r\rRequired argument - id",
        args: {
          id: { 
            type: new GraphQLNonNull(GraphQLString),
            description: "--Required--\r\rThe ID of the pet you would like to display, returned in PetType.Id"
          }
        },
        resolve: (root, args) => axios.get(petUrl, {
          params: {
            key: petfinderKey,
            id: args.id,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.pet;
        })
      },

      randomPet: { 
        type: PetType,
        description: "Returns a random pet. While no arguments are required, there are many that can help narrow your search.\r\rRequired arguments - none",
        args: { 
          animal: { 
            type: GraphQLString,
            description: "The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]"
          },
          breed: { 
            type: GraphQLString,
            description: "The breed of animal. Use breedList for a list of possible values."
          },
          size: { 
            type: GraphQLString,
            description: "Size of animal. Possible values: [S, M, L, XL]"
          },
          sex: { 
            type: GraphQLString,
            description: "Sex of animal. Possible values: [F, M]"
          },
          location: { 
            type: GraphQLString,
            description: "The ZIP/postal code or city and state of the animal. (Closest will be selected)"          
          },
          shelterid: { 
            type: GraphQLString,
            description: "The ID of the shelter that posted the pet."
          }
         },
        resolve: (root, args) => axios.get(randomPetUrl, {
          params: {
            key: petfinderKey,
            animal: args.animal,
            breed: args.breed,
            output: 'basic',
            format: 'json'
          }
        }).then(response => {return response.data.petfinder.pet})
      },

      petFind: {
        type: new GraphQLList(PetType),
        description: "Searches for pet according to arguments. Returns a list of records.\r\rRequied arguments - Location",
        args: {
          location: { 
            type: GraphQLString,
            description: "--Required--\r\rZip/Postal Code or City and State where the search should begin."
          },
          animal: {
            type: GraphQLString,
            description: "The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]"
          },
          breed: {
            type: GraphQLString,
            description: "The breed of animal. Use breedList for a list of possible values."
          },
          size: { 
            type: GraphQLString,
            description: "Size of animal. Possible values: [S, M, L, XL]"
          },
          sex: { 
            type: GraphQLString,
            description: "Sex of animal. Possible values: [F, M]"
          },
          age: {
            type: GraphQLString,
            description: "Age of animal. Possible values: [Baby, Young, Adult, Senior]"
          },
          // TODO: Add offset functionality
          // offset: {
          //   type: GraphQLInt,
          //   description: "set this to the value of lastOffset returned by a previous call to petFind, and it will retrieve the next result set"
          // },
          count: {
            type: GraphQLInt,
            description: "How many records to return with the call. Default is 25."
          }
        },
        resolve: (root, args) => axios.get(petFindUrl, {
          params: {
            key: petfinderKey,
            location: args.location,
            animal: args.animal,
            breed: args.breed,
            size: args.size,
            sex: args.sex,
            age: args.age,
            count: args.count,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.pets.pet;
        })
      },
      
      shelterFind: {
        type: new GraphQLList(ShelterType),
        description: "Finds shelter records that match the arguments used.\r\rRequired arguments: location",
        args: {
          location: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Zip/Postal Code or city and state where the search should begin.\r\r--Required--"
          },
          name: {
            type: GraphQLString,
            description: "Full or partial shelter name."
          },
          // TODO: offset
          count: {
            type: GraphQLInt,
            description: "How many records to return with the call. Default is 25."
          },
        },
        resolve: (root, args) => axios.get(shelterFindUrl, {
          params: {
            key: petfinderKey,
            location: args.location,
            name: args.name,
            count: args.count,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.shelters.shelter;
        })
      },
      
      shelter: {
        type: ShelterType,
        description: "Returns a record for a single shelter.\r\rRequired argument: shelterId",
        args: {
          shelterId: {
            type: GraphQLString,
            description: "The ID of the shelter. Can be found by running shelterFind."
          }
        },
        resolve: (root, args) => axios.get(shelterUrl, {
          params: {
            key: petfinderKey,
            id: args.shelterId,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.shelter;
        })
      },
      
      shelterGetPets: {
        type: new GraphQLList(PetType),
        description: "Returns a list of pet records for a shelter.\r\rRequired argument: shelterId",
        args: { 
          shelterId: {
            type: GraphQLString,
            description: "The ID of the shelter. Can be found by running shelterFind."
          },
          //TODO: status 
          //TODO: offset
          count: {
            type: GraphQLInt,
            description: "How many records to return with the call. Default is 25."
          }
        },
        resolve: (root, args) => axios.get(shelterGetPetsUrl, {
          params: {
            key: petfinderKey,
            id: args.shelterId,
            count: args.count,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.pets.pet;
        })
      },
      
      shelterListByBreed: {
        type: new GraphQLList(ShelterType),
        description: "Returns a list of shelter IDs listing animals of a particular breed.\r\rRequired arguments: [animal, breed]",
        args: {
          animal: {
            type: GraphQLString,
            description: "The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]"
          },
          breed: {
            type: GraphQLString,
            description: "The breed of animal. Use breedList for a list of possible values."
          },
          //TODO: offset
          count: {
            type: GraphQLInt,
            description: "How many records to return with the call. Default is 25."
          },
        },
        resolve: (root, args) => axios.get(shelterListByBreedUrl, {
          params: {
            key: petfinderKey,
            animal: args.animal,
            breed: args.breed,
            count: args.count,
            format: 'json'
          }
        }).then(response => {
          return response.data.petfinder.shelters;
        })
      }
    })
  })
})