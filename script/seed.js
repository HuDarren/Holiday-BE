const db = require('../server/db');
const { User, Group, Item, WishList } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'amy@email.com',
      password: '123456',
      name: 'Tester Amy',
    }),
    User.create({
      email: 'bruce@email.com',
      password: '123456',
      name: 'Tester Bruce',
    }),
    User.create({
      email: 'corvus@email.com',
      password: '123456',
      name: 'Tester Corvus',
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  const groups = await Promise.all([
    Group.create({
      name: 'Christmas Party',
      description: 'We Ho-Ho-Hope You Can Join Us',
      budget: 10.0,
      userId: 1,
    }),
    Group.create({
      name: 'Holly Jolly Secret Santa',
      description: `Friends, family, and holiday cheer,
    Make Christmas the most wonderful time of the year!`,
      budget: 10.0,
      userId: 2,
    }),
    Group.create({
      name: 'Happy Birthday',
      description: `Lets celebrate birthday!`,
      budget: 10.0,
      userId: 3,
    }),
  ]);

  console.log(`seeded ${groups.length} groups`);

  const wishlists = await Promise.all([
    WishList.create({
      name: 'Toys',
      description: 'Fun Toys',
      userId: 1,
    }),
    WishList.create({
      name: 'Cards',
      description: 'Fun Cards',
      userId: 2,
    }),
    WishList.create({
      name: 'Electronic',
      description: 'Fun Electronic',
      userId: 2,
    }),
  ]);

  console.log(`seeded ${wishlists.length} wishlists`);

  const items = await Promise.all([
    Item.create({
      name: 'Car',
      description: 'Toy Car',
      wishlistId: 1,
    }),
    Item.create({
      name: 'Plane',
      description: 'Toy Plane',
      wishlistId: 1,
    }),
    Item.create({
      name: 'Pokemon',
      description: 'CardGame',
      wishlistId: 2,
    }),
    Item.create({
      name: 'Digimon',
      description: 'CardGame',
      wishlistId: 2,
    }),
    Item.create({
      name: 'Iphone',
      description: 'Phone',
      wishlistId: 3,
    }),
  ]);

  console.log(`seeded ${items.length} item`);

  // const group = await Group.findOne({ where: { id: 1 } });
  // const following = await group.addUsers([1, 2]);

  // console.log(`seeded ${following.length} followings to group 1`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
