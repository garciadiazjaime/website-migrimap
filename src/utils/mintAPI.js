function getPlacesQuery(id = '' ) {
  return `
    {
      migriPlace(id: "${id}") {
        _id
        name
        description
        profile
        address
        gmaps
        phone
        servicesFree
        servicesNonFree
        image
        website
        socialNetwork
        ceo
        owner
        language
        schedule
        capacity
        population
        category
      }
    }
  `
}

async function requestHelper(payload) {
  const result = await fetch(
    `process.API_URL/graphiql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return await result.json()
}

async function getPlaces(id) {
  const payload = {
    query: getPlacesQuery(id)
  };

  const {
    data: { migriPlace }
  } = await requestHelper(payload)

  return migriPlace;
}

export {
  getPlaces,
} 
