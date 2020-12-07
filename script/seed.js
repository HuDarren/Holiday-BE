const db = require('../server/db');
const {User, Group} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({email: 'amy@email.com', password: '123456', name: 'Tester Amy'}),
    User.create({email: 'bruce@email.com', password: '123456', name: 'Tester Bruce'}),
    User.create({email: 'corvus@email.com', password: '123456', name: 'Tester Corvus'}),
  ])

  console.log(`seeded ${users.length} users`)

  const groups = await Promise.all([
    Group.create({name: 'Christmas Party', description: 'We Ho-Ho-Hope You Can Join Us', creatorId: 1}),
    Group.create({name: 'Holly Jolly Secret Santa', description: `Friends, family, and holiday cheer,
    Make Christmas the most wonderful time of the year!`, creatorId: 2})
  ])

  console.log(`seeded ${groups.length} groups`)

  const group = await Group.findOne({ where: { id: 1}})
  const following = await group.addUsers([1,2]);

  console.log(`seeded ${following.length} followings to group 1`)
  console.log(`seeded successfully`)

}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
