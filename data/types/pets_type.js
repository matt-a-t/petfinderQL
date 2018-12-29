const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');

const SinglePetType = require('./pet_type');

module.exports = new GraphQLObjectType({
  name: 'Pets',
  description: 'The pet list and the offset',

  fields: () => ({
    lastOffset: {
      type: GraphQLInt,
      resolve: json => json.lastOffset
    },
    pets: {
      type: new GraphQLList(SinglePetType),
      resolve: json => {
        console.log('json', json);
        return json.pets;
      }
    }
  })
});
