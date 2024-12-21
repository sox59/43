async function start() {
  const ourPromise = await fetch("/.netlify/functions/adminDashboard")
  const ourData = await ourPromise.json()

  if (ourData.success) {
    // doing something interesting, show the pet management UI
  } else {
    window.location = "/login"
  }
}

start()