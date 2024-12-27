const handler = event => {

  const body = JSON.parse(event.body)
  console.log(body)


}

module.exports = { handler }