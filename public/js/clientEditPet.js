const urlVariables = new URLSearchParams(window.location.search)
const id = urlVariables.get("id")
console.log(id)