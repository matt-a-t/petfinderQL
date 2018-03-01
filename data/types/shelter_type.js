const { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString} = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'Shelter',
  description: 'The shelter object',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: json => { return json.id.$t }
    },

    name: {
      type: GraphQLString,
      resolve: json => { return json.name.$t }
     },

    phone: {
     type: GraphQLString,
     resolve: json => { return json.phone.$t }
    },

    email: {
      type: GraphQLString,
      resolve: json => { return json.email.$t }
    },
    
    address1: {
      type: GraphQLString,
      resolve: json => { return json.address1.$t }
    },

    address2: {
     type: GraphQLString,
     resolve: json => { return json.state.$t }
    },

    city: {
     type: GraphQLString,
     resolve: json => { return json.city.$t }
    },

    state: {
      type: GraphQLString,
      resolve: json => { return json.state.$t }
    },

    zip: {
     type: GraphQLString,
     resolve: json => { return json.zip.$t }
    },

    country: {
      type: GraphQLString,
      resolve: json => { return json.country.$t }
    },

    fax: {
      type: GraphQLString,
      resolve: json => { return json.fax.$t }
    },

    latitude: {
      type: GraphQLString,
      resolve: json => { return json.latitude.$t }
     },

    longitude: {
      type: GraphQLString,
      resolve: json => { return json.longitude.$t }
     },
  })
})