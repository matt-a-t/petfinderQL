const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = require('graphql');

const ContactType = require('./contact_type');
const MediaType = require('./media_type');
const BreedType = require('./breed_type');
const OptionType = require('./option_type');

module.exports = new GraphQLObjectType({
  name: 'Pet',
  description: 'The Pet object',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => json.name.$t
    },
    options: {
      type: new GraphQLList(OptionType),
      resolve: json => json.options.option
    },
    status: {
      type: GraphQLString,
      resolve: json => json.status.$t
    },
    contact: {
      type: ContactType,
      resolve: json => json.contact
    },
    age: {
      type: GraphQLString,
      resolve: json => json.age.$t
    },
    size: {
      type: GraphQLString,
      resolve: json => json.size.$t
    },
    media: {
      type: MediaType,
      resolve: json => json.media
    },
    id: {
      type: GraphQLInt,
      resolve: json => json.id.$t
    },
    shelterPetId: {
      type: GraphQLString,
      resolve: json => json.shelterPetId.$t
    },
    //TODO: breeds has problem if there are not multiple
    breeds: {
      type: new GraphQLList(BreedType),
      resolve: json => json.breeds.breed
    },
    sex: {
      type: GraphQLString,
      resolve: json => json.sex.$t
    },
    description: {
      type: GraphQLString,
      resolve: json => json.description.$t
    },
    mix: {
      type: GraphQLString,
      resolve: json => json.mix.$t
    },
    shelterId: {
      type: GraphQLString,
      resolve: json => json.shelterId.$t
    },
    lastUpdate: {
      type: GraphQLString,
      resolve: json => json.lastUpdate.$t
    },
    animal: {
      type: GraphQLString,
      resolve: json => json.animal.$t
    }
  })
});
