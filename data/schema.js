const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = require('graphql');

// This calls for an environment variable that contains your Petfinder key. You can either replace this with a string
// that contains your petfinder key or set it as an environment variable on the machine you are running the server on.
const petfinderKey = process.env.PETFINDER_KEY;
const baseUrl = 'https://api.petfinder.com';

const randomPetUrl = `${baseUrl}/pet.getRandom`;
const breedListUrl = `${baseUrl}/breed.list`;
const petUrl = `${baseUrl}/pet.get`;
const petFindUrl = `${baseUrl}/pet.find`;
const shelterUrl = `${baseUrl}/shelter.get`;
const shelterFindUrl = `${baseUrl}/shelter.find`;
const shelterGetPetsUrl = `${baseUrl}/shelter.getPets`;
const shelterListByBreedUrl = `${baseUrl}/shelter.listByBreed`;

const PetsType = require('./types/pets_type');
const PetType = require('./types/pet_type');
const BreedType = require('./types/breed_type');
const SheltersType = require('./types/shelters_type');
const ShelterType = require('./types/shelter_type');

const doRequest = (endpoint, params) => {
  console.log(endpoint, JSON.stringify(params));
  return axios.get(endpoint, {
    params
  });
};

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      breedList: {
        type: new GraphQLList(BreedType),
        description:
          'Returns a list of breeds for specified types of animals. See animal argument for possible values.\r\rRequired argument - animal',
        args: {
          animal: {
            type: new GraphQLNonNull(GraphQLString),
            description:
              '--Required--\r\rThe type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]'
          }
        },
        resolve: (root, args) =>
          doRequest(breedListUrl, {
            key: petfinderKey,
            animal: args.animal,
            format: 'json'
          }).then(response => response.data.petfinder.breeds.breed)
      },

      pet: {
        type: PetType,
        description: 'Returns a single pet. \r\rRequired argument - id',
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
            description:
              '--Required--\r\rThe ID of the pet you would like to display, returned in PetType.Id'
          }
        },
        resolve: (root, args) =>
          doRequest(petUrl, {
            key: petfinderKey,
            id: args.id,
            format: 'json'
          }).then(response => response.data.petfinder.pet)
      },

      randomPet: {
        type: PetType,
        description:
          'Returns a random pet. While no arguments are required, there are many that can help narrow your search.\r\rRequired arguments - none',
        args: {
          animal: {
            type: GraphQLString,
            description:
              'The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]'
          },
          breed: {
            type: GraphQLString,
            description:
              'The breed of animal. Use breedList for a list of possible values.'
          },
          size: {
            type: GraphQLString,
            description: 'Size of animal. Possible values: [S, M, L, XL]'
          },
          sex: {
            type: GraphQLString,
            description: 'Sex of animal. Possible values: [F, M]'
          },
          location: {
            type: GraphQLString,
            description:
              'The ZIP/postal code or city and state of the animal. (Closest will be selected)'
          },
          shelterid: {
            type: GraphQLString,
            description: 'The ID of the shelter that posted the pet.'
          }
        },
        resolve: (root, args) =>
          doRequest(randomPetUrl, {
            key: petfinderKey,
            animal: args.animal,
            breed: args.breed,
            output: 'basic',
            format: 'json'
          }).then(response => response.data.petfinder.pet)
      },

      petFind: {
        type: PetsType,
        description:
          'Searches for pet according to arguments. Returns a list of records.\r\rRequied arguments - Location',
        args: {
          location: {
            type: GraphQLString,
            description:
              '--Required--\r\rZip/Postal Code or City and State where the search should begin.'
          },
          animal: {
            type: GraphQLString,
            description:
              'The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]'
          },
          breed: {
            type: GraphQLString,
            description:
              'The breed of animal. Use breedList for a list of possible values.'
          },
          size: {
            type: GraphQLString,
            description: 'Size of animal. Possible values: [S, M, L, XL]'
          },
          sex: {
            type: GraphQLString,
            description: 'Sex of animal. Possible values: [F, M]'
          },
          age: {
            type: GraphQLString,
            description:
              'Age of animal. Possible values: [Baby, Young, Adult, Senior]'
          },
          offset: {
            type: GraphQLInt,
            description:
              'set this to the value of lastOffset returned by a previous call to petFind, and it will retrieve the next result set'
          },
          count: {
            type: GraphQLInt,
            description:
              'How many records to return with the call. Default is 25.'
          }
        },
        resolve: (root, args) =>
          doRequest(petFindUrl, {
            key: petfinderKey,
            location: args.location,
            animal: args.animal,
            breed: args.breed,
            size: args.size,
            sex: args.sex,
            age: args.age,
            offset: args.offset,
            count: args.count,
            format: 'json'
          }).then(response => ({
            lastOffset: response.data.petfinder.lastOffset.$t,
            pets: response.data.petfinder.pets.pet
          }))
      },

      shelterFind: {
        type: SheltersType,
        description:
          'Finds shelter records that match the arguments used.\r\rRequired arguments: location',
        args: {
          location: {
            type: new GraphQLNonNull(GraphQLString),
            description:
              'Zip/Postal Code or city and state where the search should begin.\r\r--Required--'
          },
          name: {
            type: GraphQLString,
            description: 'Full or partial shelter name.'
          },
          offset: {
            type: GraphQLInt,
            description:
              'set this to the value of lastOffset returned by a previous call to shelterFind, and it will retrieve the next result set'
          },
          count: {
            type: GraphQLInt,
            description:
              'How many records to return with the call. Default is 25.'
          }
        },
        resolve: (root, args) =>
          doRequest(shelterFindUrl, {
            key: petfinderKey,
            location: args.location,
            name: args.name,
            count: args.count,
            offset: args.offset,
            format: 'json'
          }).then(response => ({
            lastOffset: response.data.petfinder.lastOffset.$t,
            shelters: response.data.petfinder.shelters.shelter
          }))
      },

      shelter: {
        type: ShelterType,
        description:
          'Returns a record for a single shelter.\r\rRequired argument: shelterId',
        args: {
          shelterId: {
            type: GraphQLString,
            description:
              'The ID of the shelter. Can be found by running shelterFind.'
          }
        },
        resolve: (root, args) =>
          doRequest(shelterUrl, {
            key: petfinderKey,
            id: args.shelterId,
            format: 'json'
          }).then(response => response.data.petfinder.shelter)
      },

      shelterGetPets: {
        type: PetsType,
        description:
          'Returns a list of pet records for a shelter.\r\rRequired argument: shelterId',
        args: {
          shelterId: {
            type: GraphQLString,
            description:
              'The ID of the shelter. Can be found by running shelterFind.'
          },
          status: {
            type: GraphQLString,
            description: 'The status of the pets that you have looking for '
          },
          offset: {
            type: GraphQLInt,
            description:
              'set this to the value of lastOffset returned by a previous call to shelterFind, and it will retrieve the next result set'
          },
          count: {
            type: GraphQLInt,
            description:
              'How many records to return with the call. Default is 25.'
          }
        },
        resolve: (root, args) =>
          doRequest(shelterGetPetsUrl, {
            key: petfinderKey,
            id: args.shelterId,
            count: args.count,
            offset: args.offset,
            status: args.status,
            format: 'json'
          }).then(response => ({
            lastOffset: response.data.petfinder.lastOffset.$t,
            pets: response.data.petfinder.pets.pet
          }))
      },

      shelterListByBreed: {
        type: SheltersType,
        description:
          'Returns a list of shelter IDs listing animals of a particular breed.\r\rRequired arguments: [animal, breed]',
        args: {
          animal: {
            type: GraphQLString,
            description:
              'The type of animal. Possible values: [barnyard, bird, cat, dog, horse, reptile, smallfurry]'
          },
          breed: {
            type: GraphQLString,
            description:
              'The breed of animal. Use breedList for a list of possible values.'
          },
          offset: {
            type: GraphQLInt,
            description:
              'set this to the value of lastOffset returned by a previous call to shelterFind, and it will retrieve the next result set'
          },
          count: {
            type: GraphQLInt,
            description:
              'How many records to return with the call. Default is 25.'
          }
        },
        resolve: (root, args) =>
          doRequest(shelterListByBreedUrl, {
            key: petfinderKey,
            animal: args.animal,
            breed: args.breed,
            count: args.count,
            offset: args.offset,
            format: 'json'
          }).then(response => ({
            lastOffset: response.data.petfinder.lastOffset.$t,
            shelters: response.data.petfinder.shelters.shelter
          }))
      }
    })
  })
});
