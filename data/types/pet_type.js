const { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString} = require('graphql');

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
      resolve: json => { return json.name.$t; }
    },
    options: { 
      type: new GraphQLList(OptionType),
      resolve: json => { return json.options.option; }
    },
    status: { 
      type: GraphQLString,
      resolve: json => { return json.status.$t; }
    },
    contact: { 
      type: ContactType,
      resolve: json => { return json.contact; }
    },
    age: {
      type: GraphQLString,
      resolve: json => { return json.age.$t }
    },
    size: {
      type: GraphQLString,
      resolve: json => { return json.size.$t }
    },
    media: { 
      type: MediaType,
      resolve: json => { return json.media }
    },
    id: {
      type: GraphQLInt,
      resolve: json => { return json.id.$t }
    },
    shelterPetId: {
      type: GraphQLString,
      resolve: json => { return json.shelterPetId.$t }
    },
    //TODO: breeds has problem if there are not multiple
    breeds: { 
      type: new GraphQLList(BreedType),
      resolve: json => { return json.breeds.breed }
    },
    sex: {
      type: GraphQLString,
      resolve: json => { return json.sex.$t }
    },
    description: {
      type: GraphQLString,
      resolve: json => { return json.description.$t }
    },
    mix: {
      type: GraphQLString,
      resolve: json => { return json.mix.$t }
    },
    shelterId: {
      type: GraphQLString,
      resolve: json => { return json.shelterId.$t }
    },
    lastUpdate: {
      type: GraphQLString,
      resolve: json => { return json.lastUpdate.$t }
    },
    animal: {
      type: GraphQLString,
      resolve: json => { return json.animal.$t }
    }
  })
})