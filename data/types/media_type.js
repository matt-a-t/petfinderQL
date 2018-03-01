const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Media for pet',

  fields: () => ({
    photos: {
      type: new GraphQLList(PhotoType),
      resolve: json => { return json.photos.photo }
    }
  })
})

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: 'Photo of pet',

  fields: () => ({
    size: {
      type: GraphQLString,
      //dot notation does not allow the @ symbol
      resolve: json => { return json['@size'] }
    },
    url: {
      type: GraphQLString,
      resolve: json => { return json.$t }
    },
    id: {
      type: GraphQLString,
      resolve: json => { return json['@id'] }
    }
  })
})

module.exports = MediaType;