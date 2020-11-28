function getPlacesQuery(lngLat) {
  return `
    {
      migriPlace(lngLat: ${JSON.stringify(lngLat) || null}) {
        _id
        name
        description
        profile
        address
        gmaps
        phone
        servicesFree
        servicesNonFree
        imageUrl
        website
        socialNetwork
        ceo
        owner
        language
        schedule
        capacity
        population
        category
        dist
        gps {
          coordinates
        }
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

async function getPlaces(lngLat) {
  const payload = {
    query: getPlacesQuery(lngLat)
  };

  const {
    data: { migriPlace }
  } = await requestHelper(payload)

  return migriPlace;
}

export {
  getPlaces,
} 
