const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');

const SingleShelterType = require('./shelter_type');

module.exports = new GraphQLObjectType({
  name: 'Shelters',
  description: 'The shelter list and the offset',

  fields: () => ({
    lastOffset: {
      type: GraphQLInt,
      resolve: json => json.lastOffset
    },
    shelters: {
      type: new GraphQLList(SingleShelterType),
      resolve: json => {
        // console.log('json', json);
        return json.shelters;
      }
    }
  })
});
