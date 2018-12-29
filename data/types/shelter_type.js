const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Shelter',
  description: 'The shelter object',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: json => json.id.$t
    },

    name: {
      type: GraphQLString,
      resolve: json => json.name.$t
    },

    phone: {
      type: GraphQLString,
      resolve: json => json.phone.$t
    },

    email: {
      type: GraphQLString,
      resolve: json => json.email.$t
    },

    address1: {
      type: GraphQLString,
      resolve: json => json.address1.$t
    },

    address2: {
      type: GraphQLString,
      resolve: json => json.state.$t
    },

    city: {
      type: GraphQLString,
      resolve: json => json.city.$t
    },

    state: {
      type: GraphQLString,
      resolve: json => json.state.$t
    },

    zip: {
      type: GraphQLString,
      resolve: json => json.zip.$t
    },

    country: {
      type: GraphQLString,
      resolve: json => json.country.$t
    },

    fax: {
      type: GraphQLString,
      resolve: json => json.fax.$t
    },

    latitude: {
      type: GraphQLString,
      resolve: json => json.latitude.$t
    },

    longitude: {
      type: GraphQLString,
      resolve: json => json.longitude.$t
    }
  })
});
