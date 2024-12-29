const sanitizeHTML = require("sanitize-html")
const isAdmin = require("../../our-library/isAdmin")
const getDbClient = require("../../our-library/getDbClient")

function cleanUp(x) {
  return sanitizeHTML(x, {
    allowedTags: [],
    allowedAttributes: {}
  })
}

const handler = async event => {

  const body = JSON.parse(event.body)

  let pet = {

    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
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