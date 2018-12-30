# PetfinderQL

This is an Express App that exposes the Petfinder API as a GraphQL server. Likely you know if you are here, but GraphQL is a new query language that allows for flexible querying client side. It allows for the client side code to determine the form that queries are returned, and I have found it very useful to make the Petfinder API to be much easier to use.

## GraphQL

To find out more about GraphQL, their website has excellent tutorials and documentation: https://graphql.org

## Petfinder API

The Petfinder API exposes the huge database of pet information that Petfinder has gathered. According to the website:

>The Petfinder API gives developers access to Petfinder's database of over 300,000 adoptable pets and 11,000 animal welfare organizations (AWO). In addition to searching for adoptable pets on the Petfinder.com web site, you can use the API to create your own dynamic pet web sites or applications, using the same data we use on Petfinder.com.

More documentation about the API that is referenced in this project can be found at https://www.petfinder.com/developers/api-docs

## Quick start

```bash
# clone the repo
git clone https://github.com/abdullahceylan/petfinderQL.git

# change into the repo directory
cd petfinderQL

# install
npm install

# create your .env file
cp .env.example .env
# ... and populate .env with your API key

# run dev mode
npm run start:dev

# run production mode
npm run start
```

Then visit [http://localhost:4000](http://localhost:4000) in your browser.

## Healthcheck Endpoint

Whether the server is up, you can monitor on http://localhost:4000/healthcheck 

## API Usage

### Breed list
Returns a list of breeds for specified types of animals. See animal argument for possible values.

**Required argument** - `animal`

```js
{
  breedList(animal: String) {
    breed
  }
}
```

### Get a pet from ID
Returns a single pet.

**Required argument** - `id`

```js
{
  pet(id: String) {
    name
    options {
      option
    }
    status
    contact {
      phone
      email
      city
      state
      zip
      address1
      address2
      fax
    }
    age
    size
    media {
      photos {
        id
        size
        url
      }
    }
    id
    shelterPetId
    breeds {
      breed
    }
    sex
    description
    mix
    shelterId
    lastUpdate
    animal
  }
}
```

### Random Pet
Returns a random pet. While no arguments are required, there are many that can help narrow your search.

```js
{
  randomPet {
    id
    description
    name
    age
    shelterId
  }
}
```

### Pet Search
Searches for pet according to arguments. Returns a list of records.

**Requied arguments** - `location`

```js
{
  petFind(
    location: String,
    animal: String,
    breed: String,
    size: String,
    sex: String,
    age: String,
    offset: Int,
    count: Int
  ) {
    lastOffset
    pets {
      id
      name
    }
  }
}
```

### Shelter Search
Finds shelter records that match the arguments used.

**Required arguments:** `location`

```js
{
  shelterFind(
    location: String!
    name: String
    count: Int
    offset: Int
  ) {
    lastOffset
    shelters {
      id
      name
      phone
      email
      address1
      address2
      city
      state
      zip
      country
      fax
      latitude
      longitude
    }
  }
}
```

### Get a single shelter
Returns a record for a single shelter.

**Required argument:** `shelterId`

```js
{
  shelter(shelterId: String) {
    id
    name
    phone
    email
    address1
    address2
    city
    state
    zip
    country
    fax
    latitude
    longitude
  }
}
```

### Shelter pets lists

Returns a list of pet records for a shelter.

**Required argument:** `shelterId`

```js
{
  shelterGetPets(shelterId: String, count: Int, offset: Int, status: String) {
    lastOffset
    pets {
      name
      status
      contact {
        phone
        email
        city
        state
        zip
        address1
        address2
        fax
      }
      age
      size
      media {
        photos {
          id
          size
          url
        }
      }
      id
      shelterPetId
      sex
      description
      mix
      shelterId
      lastUpdate
      animal
    }
  }
}
```

### Shelter list by breed
Returns a list of shelter IDs listing animals of a particular breed.

**Required arguments:** `animal`, `breed`

```js
{
  shelterListByBreed(animal: String, breed: String) {
    id
    name
    phone
    email
    address1
    address2
    city
    state
    zip
    country
    fax
    latitude
    longitude
  }
}
```

## Test Url
https://ac-petfinderql.herokuapp.com/