const isAdmin = require("../../our-library/isAdmin")
const getDbClient = require("../../our-library/getDbClient")

const handler = async event => {

  const body = JSON.parse(event.body)

  let pet = {

    name: body.name,
    species: body.species,
    description: body.description,
    birthYear: new Date().getFullYear()

  }

  if (body.birthYear > 999 && body.birthYear < 9999) pet.birthYear = body.birthYear

  if (pet.species != "cat" && pet.species != "dog") pet.species = "dog"


  if (isAdmin(event)) {

    const client = await getDbClient()
    await client.db().collection("pets").insertOne(pet)
    client.close()

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }


  }


  // np permission
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }


}

module.exports = { handler }