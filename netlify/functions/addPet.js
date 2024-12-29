const isAdmin = require("../../our-library/isAdmin")
const getDbClient = require("../../our-library/getDbClient")

const handler = async event => {

  const body = JSON.parse(event.body)
  console.log(body)

  if (isAdmin(event)) {

    const client = await getDbClient()
    await client.db().collection("pets").insertOne(body)
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