
const escape = require("escape-html")
const { MongoClient } = require("mongodb")
const isAdmin = require("../../our-library/isAdmin")


const cookie = require("cookie")

const handler = async event => {


  if (isAdmin(event)) {
    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()

    const pets = await client.db().collection("pets").find().toArray()
    client.close()

    const petsHTML = generateHTML(pets)



    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, pets: petsHTML })
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }

}

function generateHTML(p) {

  let ourHTML = `<div class="list-of-pets">`
  ourHTML += p.map(pet => {

    return `<div class="pet-card">
    <div class="pet-card-text">
      <h3>${escape(pet.name)}</h3>
      <p class="pet-description">${escape(pet.description)}</p>
      <div class="action-buttons">
      <a class="action-btn" href="/admin/edit-pet?id=${pet._id}&skycolor=blue">Edit</a>
      <button class="action-btn">Delete</button>
      </div>
    </div>
    <div class="pet-card-photo">
      <img src="/images/fallback.jpg" alt="A ${escape(pet.species)} named ${escape(pet.name)}">
    </div>
  </div>`

  }).join("")

  ourHTML += "</div>"

  return ourHTML


}

module.exports = { handler }