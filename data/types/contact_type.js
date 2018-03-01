const { GraphQLObjectType, GraphQLString } = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'Contact info for pet',

  fields: () => ({
    phone: {
      type: GraphQLString,
      resolve: json => { return json.phone.$t }
    },
    email: {
      type: GraphQLString,
      resolve: json => { return json.email.$t }
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
    address1: {
      type: GraphQLString,
      resolve: json => { return json.address1.$t }
    },
    address2: {
      type: GraphQLString,
      resolve: json => { return json.address2.$t}
    },
    fax: {
      type: GraphQLString,
      resolve: json => { return json.fax.$t }
    }
  })
});

module.exports = ContactType;