const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

dotenv.config()

const { DIRECTUS_HOST, DIRECTUS_API_USER, DIRECTUS_API_PASSWORD } = process.env

async function main() {
  const res = await fetch(`${DIRECTUS_HOST}/_/auth/authenticate`, {
    method: 'POST',
    body: JSON.stringify({ email: DIRECTUS_API_USER, password: DIRECTUS_API_PASSWORD }),
    headers: { 'Content-Type': 'application/json' },
  })
  const { data } = await res.json()
  const { token } = data

  const roles = await fetch(`${DIRECTUS_HOST}/_/roles?access_token=${token}`)
  const rolesJson = await roles.json()

  const studentsRole = rolesJson.data.find((role) => role.name === 'Alumn@')
  const guestsRole = rolesJson.data.find((role) => role.name === 'Invitad@')
  const studentsRoleId = studentsRole.id
  const guestsRoleId = guestsRole.id

  const allUsers = await fetch(`${DIRECTUS_HOST}/_/users?access_token=${token}`)
  const allUsersJson = await allUsers.json()
  const usersFiltered = allUsersJson.data.filter(
    (user) => user.role === studentsRoleId || user.role === guestsRoleId,
  )

  const allEvents = await fetch(
    `${DIRECTUS_HOST}/_/items/cronograma?access_token=${token}`,
  )
  const allEventsJson = await allEvents.json()

  const allEventsWithUserNames = allEventsJson.data.map((event) => {
    const user = usersFiltered.find((user) => user.id === event.user_asociado)

    if (!user) return event

    const user_name = `${user.first_name.split(/[ ,]+/)[0]} ${
      user.last_name.split(/[ ,]+/)[0]
    }`

    return {
      ...event,
      user_name,
    }
  })

  fs.writeFileSync(
    path.join(__dirname, 'src/events.json'),
    JSON.stringify(allEventsWithUserNames),
  )
}

main()
