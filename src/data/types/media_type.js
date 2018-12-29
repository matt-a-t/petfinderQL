const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Media for pet',

  fields: () => ({
    photos: {
      type: new GraphQLList(PhotoType),
      resolve: json => json.photos.photo
    }
  })
});

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: 'Photo of pet',

  fields: () => ({
    size: {
      type: GraphQLString,
      //dot notation does not allow the @ symbol
      resolve: json => json['@size']
    },
    url: {
      type: GraphQLString,
      resolve: json => json.$t
    },
    id: {
      type: GraphQLString,
      resolve: json => json['@id']
    }
  })
});

module.exports = MediaType;
