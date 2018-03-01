const { GraphQLObjectType, GraphQLString } = require('graphql')

const OptionType = new GraphQLObjectType({
  name: 'Option',
  description: 'The Options object from Pet',

  fields: () => ({
    option: {
      type: GraphQLString,
      resolve: json => { return json.$t; }
    }
  })
})

module.exports = OptionType;