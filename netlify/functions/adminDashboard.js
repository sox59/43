const cookie = require("cookie")

const handler = async event => {

  const incomingCookie = cookie.parse(event.headers.cookie || "")
  if (incomingCookie?.petadoption == "askldjasdjklfkljads123981231231230asdfjkasdfjk1230910230asdjklfakjlsd1209309123123") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }

}

module.exports = { handler }