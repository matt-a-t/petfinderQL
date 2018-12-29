const { GraphQLObjectType, GraphQLString } = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'Contact info for pet',

  fields: () => ({
    phone: {
      type: GraphQLString,
      resolve: json => json.phone.$t
    },
    email: {
      type: GraphQLString,
      resolve: json => json.email.$t
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
    address1: {
      type: GraphQLString,
      resolve: json => json.address1.$t
    },
    address2: {
      type: GraphQLString,
      resolve: json => json.address2.$
    },
    fax: {
      type: GraphQLString,
      resolve: json => json.fax.$t
    }
  })
});

module.exports = ContactType;
